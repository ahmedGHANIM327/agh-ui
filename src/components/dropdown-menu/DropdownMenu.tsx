import {
    type ReactNode,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { createPortal } from "react-dom";
import Icon from "../icon/Icon";
import type { IconName } from "../../icons/IconRegistry";
import styles from "./DropdownMenu.module.css";

const s = (cls: string): string => styles[cls] ?? '';

export type DropdownMenuPosition = "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "center";
export type DropdownMenuItemVariant = "default" | "primary" | "secondary" | "danger";

export interface DropdownMenuItem {
    type?: "item";
    id?: string;
    label: string;
    leftIcon?: IconName;
    rightIcon?: IconName;
    disabled?: boolean;
    variant?: DropdownMenuItemVariant;
    /** If it returns a Promise, the item shows a loader and the menu closes once it settles. */
    onClick?: () => void | Promise<unknown>;
}

export interface DropdownMenuSeparator {
    type: "separator";
}

export interface DropdownMenuLabel {
    type: "label";
    label: string;
}

export type DropdownMenuEntry = DropdownMenuItem | DropdownMenuSeparator | DropdownMenuLabel;

export interface DropdownMenuProps {
    trigger: ReactNode;
    items: DropdownMenuEntry[];
    position?: DropdownMenuPosition;
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    closeOnEsc?: boolean;
    contentClassName?: string;
}

const GAP = 6;

// ── Singleton portal container ─────────────────────────────────────────────
const PORTAL_ID = 'ds-dropdown-menu-portal';

let _portal: HTMLElement | null = null;

const getPortalEl = (): HTMLElement => {
    if (_portal) return _portal;
    let el = document.getElementById(PORTAL_ID);
    if (!el) {
        el = document.createElement('div');
        el.id = PORTAL_ID;
        el.style.cssText =
            'position:fixed;inset:0;overflow:visible;pointer-events:none;z-index:9999;';
        document.body.appendChild(el);
    }
    _portal = el;
    return _portal;
};

const getCoords = (
    rect: DOMRect,
    position: DropdownMenuPosition,
): { top: number; left: number } => {
    switch (position) {
        case 'top':
            return { top: rect.top - GAP, left: rect.left + rect.width / 2 };
        case 'top-start':
            return { top: rect.top - GAP, left: rect.left };
        case 'top-end':
            return { top: rect.top - GAP, left: rect.right };
        case 'bottom':
            return { top: rect.bottom + GAP, left: rect.left + rect.width / 2 };
        case 'bottom-start':
            return { top: rect.bottom + GAP, left: rect.left };
        case 'bottom-end':
            return { top: rect.bottom + GAP, left: rect.right };
        case 'center':
            return { top: rect.top + rect.height / 2, left: rect.left + rect.width / 2 };
    }
};

const DropdownMenu = ({
    trigger,
    items,
    position = 'bottom',
    isOpen,
    onOpenChange,
    closeOnEsc = true,
    contentClassName = '',
}: DropdownMenuProps) => {
    const triggerRef = useRef<HTMLSpanElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [internalOpen, setInternalOpen] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const [pendingIndex, setPendingIndex] = useState<number | null>(null);
    const [portal] = useState<HTMLElement>(() => getPortalEl());

    const open = isOpen ?? internalOpen;

    const setOpen = useCallback(
        (value: boolean) => {
            if (isOpen === undefined) setInternalOpen(value);
            onOpenChange?.(value);
        },
        [isOpen, onOpenChange],
    );

    const updateCoords = useCallback(() => {
        if (!triggerRef.current) return;
        setCoords(getCoords(triggerRef.current.getBoundingClientRect(), position));
    }, [position]);

    useLayoutEffect(() => {
        if (!open) return;
        updateCoords();
        window.addEventListener('resize', updateCoords);
        window.addEventListener('scroll', updateCoords, true);
        return () => {
            window.removeEventListener('resize', updateCoords);
            window.removeEventListener('scroll', updateCoords, true);
        };
    }, [open, updateCoords]);

    // Close on outside click (neither on the trigger nor in the portal content)
    useEffect(() => {
        if (!open) return;
        const handlePointerDown = (e: MouseEvent) => {
            const target = e.target as Node;
            if (triggerRef.current?.contains(target)) return;
            if (contentRef.current?.contains(target)) return;
            setOpen(false);
        };
        document.addEventListener('mousedown', handlePointerDown);
        return () => document.removeEventListener('mousedown', handlePointerDown);
    }, [open, setOpen]);

    useEffect(() => {
        if (!open || !closeOnEsc) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, closeOnEsc, setOpen]);

    const handleItemClick = async (item: DropdownMenuItem, index: number) => {
        if (item.disabled || pendingIndex !== null) return;
        const result = item.onClick?.();
        if (result instanceof Promise) {
            setPendingIndex(index);
            try {
                await result;
            } catch {
                // the menu closes once the action settles, errors are handled by the caller
            } finally {
                setPendingIndex(null);
            }
        }
        setOpen(false);
    };

    return (
        <span className={s('dropdown-menu__trigger')} ref={triggerRef}>
            <span
                className={s('dropdown-menu__trigger-button')}
                onClick={() => setOpen(!open)}
                role="button"
                tabIndex={0}
                aria-haspopup="menu"
                aria-expanded={open}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setOpen(!open);
                    }
                }}
            >
                {trigger}
            </span>

            {open &&
                createPortal(
                    <div
                        ref={contentRef}
                        role="menu"
                        className={[
                            s('dropdown-menu__content'),
                            s(`dropdown-menu__content--${position}`),
                            contentClassName,
                        ]
                            .filter(Boolean)
                            .join(' ')}
                        style={{ top: coords.top, left: coords.left }}
                    >
                        {items.map((entry, index) => {
                            if (entry.type === 'separator') {
                                return (
                                    <div
                                        key={`separator-${index}`}
                                        role="separator"
                                        className={s('dropdown-menu__separator')}
                                    />
                                );
                            }

                            if (entry.type === 'label') {
                                return (
                                    <div
                                        key={`label-${index}`}
                                        className={s('dropdown-menu__label')}
                                    >
                                        {entry.label}
                                    </div>
                                );
                            }

                            const variant = entry.variant ?? 'default';
                            const isPending = pendingIndex === index;
                            const isDisabled =
                                entry.disabled || (pendingIndex !== null && !isPending);

                            return (
                                <button
                                    key={entry.id ?? `item-${index}`}
                                    type="button"
                                    role="menuitem"
                                    disabled={isDisabled}
                                    aria-busy={isPending || undefined}
                                    className={[
                                        s('dropdown-menu__item'),
                                        s(`dropdown-menu__item--${variant}`),
                                        isPending ? s('dropdown-menu__item--loading') : '',
                                    ]
                                        .filter(Boolean)
                                        .join(' ')}
                                    onClick={() => handleItemClick(entry, index)}
                                >
                                    {isPending ? (
                                        <Icon name="spinner" size={16} />
                                    ) : (
                                        entry.leftIcon && <Icon name={entry.leftIcon} size={16} />
                                    )}
                                    <span className={s('dropdown-menu__item-label')}>
                                        {entry.label}
                                    </span>
                                    {entry.rightIcon && !isPending && (
                                        <Icon name={entry.rightIcon} size={16} />
                                    )}
                                </button>
                            );
                        })}
                    </div>,
                    portal,
                )}
        </span>
    );
};

export default DropdownMenu;
