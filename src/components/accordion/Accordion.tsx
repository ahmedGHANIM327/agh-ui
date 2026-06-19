import {
    createContext,
    useContext,
    useState,
    useCallback,
    type FC,
    type ReactNode,
} from "react";
import styles from "./Accordion.module.css";
import Icon from "../icon/Icon";
import type { IconName } from "../../icons/IconRegistry";

const s = (cls: string): string => styles[cls] ?? '';

/* ── Types ── */

export type AccordionVariant = "default" | "outline" | "card";
export type AccordionType    = "single"  | "multiple";

/* ── Root Context ── */

interface AccordionContextValue {
    openItems: Set<string>;
    toggle: (value: string) => void;
    variant: AccordionVariant;
    rootOpenIcon: IconName;
    rootCloseIcon: IconName;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

const useAccordion = (): AccordionContextValue => {
    const ctx = useContext(AccordionContext);
    if (!ctx) throw new Error("Accordion sub-components must be used inside <Accordion>.");
    return ctx;
};

/* ── Item Context ── */

interface AccordionItemContextValue {
    isOpen: boolean;
    disabled: boolean;
    toggle: () => void;
    effectiveOpenIcon: IconName;
    effectiveCloseIcon: IconName;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

const useAccordionItem = (): AccordionItemContextValue => {
    const ctx = useContext(AccordionItemContext);
    if (!ctx) throw new Error("AccordionTrigger / AccordionContent must be used inside <AccordionItem>.");
    return ctx;
};

/* ── Accordion (root) ── */

export interface AccordionProps {
    type?: AccordionType;
    defaultValue?: string | string[];
    value?: string | string[];
    onValueChange?: (value: string | string[]) => void;
    variant?: AccordionVariant;
    openIcon?: IconName;
    closeIcon?: IconName;
    children: ReactNode;
    className?: string;
}

const Accordion: FC<AccordionProps> = ({
    type = "single",
    defaultValue,
    value: controlledValue,
    onValueChange,
    variant = "default",
    openIcon = "chevronDown",
    closeIcon = "chevronUp",
    children,
    className = "",
}) => {
    const toSet = (v: string | string[] | undefined): Set<string> => {
        if (!v) return new Set();
        return new Set(Array.isArray(v) ? v : [v]);
    };

    const [internal, setInternal] = useState<Set<string>>(() => toSet(defaultValue));
    const isControlled = controlledValue !== undefined;
    const openItems = isControlled ? toSet(controlledValue) : internal;

    const toggle = useCallback((value: string) => {
        let next: Set<string>;
        if (type === "single") {
            next = openItems.has(value) ? new Set() : new Set([value]);
        } else {
            next = new Set(openItems);
            if (next.has(value)) next.delete(value);
            else next.add(value);
        }
        if (!isControlled) setInternal(next);
        onValueChange?.(type === "single" ? ([...next][0] ?? "") : [...next]);
    }, [type, openItems, isControlled, onValueChange]);

    return (
        <AccordionContext.Provider value={{ openItems, toggle, variant, rootOpenIcon: openIcon, rootCloseIcon: closeIcon }}>
            <div className={[s('accordion'), s(`accordion--${variant}`), className].filter(Boolean).join(' ')}>
                {children}
            </div>
        </AccordionContext.Provider>
    );
};

/* ── AccordionItem ── */

export interface AccordionItemProps {
    value: string;
    disabled?: boolean;
    openIcon?: IconName;
    closeIcon?: IconName;
    children: ReactNode;
    className?: string;
}

const AccordionItem: FC<AccordionItemProps> = ({
    value,
    disabled = false,
    openIcon,
    closeIcon,
    children,
    className = "",
}) => {
    const { openItems, toggle, variant, rootOpenIcon, rootCloseIcon } = useAccordion();
    const isOpen = openItems.has(value);

    return (
        <AccordionItemContext.Provider value={{
            isOpen,
            disabled,
            toggle: () => { if (!disabled) toggle(value); },
            effectiveOpenIcon:  openIcon  ?? rootOpenIcon,
            effectiveCloseIcon: closeIcon ?? rootCloseIcon,
        }}>
            <div
                data-state={isOpen ? "open" : "closed"}
                className={[
                    s('accordion__item'),
                    s(`accordion__item--${variant}`),
                    isOpen   ? s('accordion__item--open')     : '',
                    disabled ? s('accordion__item--disabled') : '',
                    className,
                ].filter(Boolean).join(' ')}
            >
                {children}
            </div>
        </AccordionItemContext.Provider>
    );
};

/* ── AccordionTrigger ── */

export interface AccordionTriggerProps {
    children: ReactNode;
    className?: string;
}

const AccordionTrigger: FC<AccordionTriggerProps> = ({ children, className = "" }) => {
    const { isOpen, disabled, toggle, effectiveOpenIcon, effectiveCloseIcon } = useAccordionItem();

    return (
        <button
            type="button"
            aria-expanded={isOpen}
            disabled={disabled}
            onClick={toggle}
            className={[
                s('accordion__trigger'),
                isOpen   ? s('accordion__trigger--open')     : '',
                disabled ? s('accordion__trigger--disabled') : '',
                className,
            ].filter(Boolean).join(' ')}
        >
            <span className={s('accordion__trigger-label')}>{children}</span>
            <Icon
                name={isOpen ? effectiveCloseIcon : effectiveOpenIcon}
                size={16}
                className={s('accordion__icon')}
            />
        </button>
    );
};

/* ── AccordionContent ── */

export interface AccordionContentProps {
    children: ReactNode;
    className?: string;
}

const AccordionContent: FC<AccordionContentProps> = ({ children, className = "" }) => {
    const { isOpen } = useAccordionItem();
    if (!isOpen) return null;

    return (
        <div className={[s('accordion__content'), className].filter(Boolean).join(' ')}>
            <div className={s('accordion__content-inner')}>
                {children}
            </div>
        </div>
    );
};

/* ── Exports ── */

export { AccordionItem, AccordionTrigger, AccordionContent };
export default Accordion;
