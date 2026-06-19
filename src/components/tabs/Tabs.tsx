import {
    createContext,
    useContext,
    useState,
    useRef,
    useCallback,
    useLayoutEffect,
    type FC,
    type ReactNode,
} from "react";
import styles from "./Tabs.module.css";

const s = (cls: string): string => styles[cls] ?? '';

/* ── Types ── */

export type TabsVariant     = "default" | "line";
export type TabsOrientation = "horizontal" | "vertical";

/* ── Context ── */

interface TabsContextValue {
    value: string;
    onValueChange: (value: string) => void;
    variant: TabsVariant;
    orientation: TabsOrientation;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabs = (): TabsContextValue => {
    const ctx = useContext(TabsContext);
    if (!ctx) throw new Error("Tabs sub-components must be used inside <Tabs>.");
    return ctx;
};

/* ── Tabs (root) ── */

export interface TabsProps {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    variant?: TabsVariant;
    orientation?: TabsOrientation;
    children: ReactNode;
    className?: string;
}

const Tabs: FC<TabsProps> = ({
    value: controlledValue,
    defaultValue = "",
    onValueChange,
    variant = "default",
    orientation = "horizontal",
    children,
    className = "",
}) => {
    const [internal, setInternal] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue! : internal;

    const handleChange = useCallback((next: string) => {
        if (!isControlled) setInternal(next);
        onValueChange?.(next);
    }, [isControlled, onValueChange]);

    return (
        <TabsContext.Provider value={{ value, onValueChange: handleChange, variant, orientation }}>
            <div
                className={[
                    s('tabs'),
                    s(`tabs--${orientation}`),
                    className,
                ].filter(Boolean).join(' ')}
            >
                {children}
            </div>
        </TabsContext.Provider>
    );
};

/* ── TabsList ── */

export interface TabsListProps {
    children: ReactNode;
    className?: string;
}

const TabsList: FC<TabsListProps> = ({ children, className = "" }) => {
    const { variant, orientation, value } = useTabs();
    const listRef      = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLSpanElement>(null);

    // Position the sliding indicator synchronously before paint to avoid a flash
    useLayoutEffect(() => {
        if (variant !== "line") return;
        const list      = listRef.current;
        const indicator = indicatorRef.current;
        if (!list || !indicator) return;

        const active = list.querySelector<HTMLElement>('[data-state="active"]');
        if (!active) return;

        const lr = list.getBoundingClientRect();
        const ar = active.getBoundingClientRect();

        if (orientation === "horizontal") {
            indicator.style.width     = `${ar.width}px`;
            indicator.style.transform = `translateX(${ar.left - lr.left}px)`;
        } else {
            indicator.style.height    = `${ar.height}px`;
            indicator.style.transform = `translateY(${ar.top - lr.top}px)`;
        }
    }, [value, variant, orientation]);

    return (
        <div
            ref={listRef}
            role="tablist"
            aria-orientation={orientation}
            className={[
                s('tabs__list'),
                s(`tabs__list--${variant}`),
                s(`tabs__list--${orientation}`),
                className,
            ].filter(Boolean).join(' ')}
        >
            {children}
            {variant === "line" && (
                <span ref={indicatorRef} className={s('tabs__indicator')} />
            )}
        </div>
    );
};

/* ── TabsTrigger ── */

export interface TabsTriggerProps {
    value: string;
    children: ReactNode;
    disabled?: boolean;
    className?: string;
}

const TabsTrigger: FC<TabsTriggerProps> = ({
    value,
    children,
    disabled = false,
    className = "",
}) => {
    const { value: active, onValueChange, variant } = useTabs();
    const isActive = active === value;

    return (
        <button
            role="tab"
            type="button"
            aria-selected={isActive}
            data-state={isActive ? "active" : "inactive"}
            disabled={disabled}
            onClick={() => onValueChange(value)}
            className={[
                s('tabs__trigger'),
                s(`tabs__trigger--${variant}`),
                isActive ? s('tabs__trigger--active')            : '',
                isActive ? s(`tabs__trigger--${variant}-active`) : '',
                disabled ? s('tabs__trigger--disabled')          : '',
                className,
            ].filter(Boolean).join(' ')}
        >
            {children}
        </button>
    );
};

/* ── TabsContent ── */

export interface TabsContentProps {
    value: string;
    children: ReactNode;
    className?: string;
}

const TabsContent: FC<TabsContentProps> = ({ value, children, className = "" }) => {
    const { value: active } = useTabs();
    if (active !== value) return null;

    return (
        <div
            role="tabpanel"
            tabIndex={0}
            className={[s('tabs__content'), className].filter(Boolean).join(' ')}
        >
            {children}
        </div>
    );
};

/* ── Exports ── */

export { TabsList, TabsTrigger, TabsContent };
export default Tabs;
