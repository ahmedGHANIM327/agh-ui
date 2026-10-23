import {
    type ReactNode,
    useEffect,
    useCallback,
} from "react";
import { createPortal } from "react-dom";
import styles from "./Sheet.module.css";
import Button from "../button/Button";

const s = (cls: string): string => styles[cls] ?? '';

export type SheetPosition = "left" | "right";

export interface SheetProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
    position?: SheetPosition;
    header?: ReactNode;
    footer?: ReactNode;
    /** Sheet width. Adapts to the content by default. */
    width?: number | string;
    showOverlay?: boolean;
    overlayClassName?: string;
    contentClassName?: string;
    trigger?: ReactNode;
    closeOnOverlayClick?: boolean;
    closeOnEsc?: boolean;
    closeButton?: boolean;
    closeButtonClassName?: string;
}

const Sheet = ({
    isOpen,
    onOpenChange,
    children,
    position = "right",
    header,
    footer,
    width,
    showOverlay = true,
    overlayClassName = "",
    contentClassName = "",
    trigger,
    closeOnOverlayClick = false,
    closeOnEsc = true,
    closeButton = true,
    closeButtonClassName = "",
}: SheetProps) => {
    const close = useCallback(() => onOpenChange(false), [onOpenChange]);
    const open = useCallback(() => onOpenChange(true), [onOpenChange]);

    useEffect(() => {
        if (!closeOnEsc || !isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, closeOnEsc, close]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <>
            {trigger && (
                <span
                    className={s('sheet__trigger')}
                    onClick={open}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") open();
                    }}
                >
                    {trigger}
                </span>
            )}

            {isOpen &&
                createPortal(
                    <div className={s('sheet__portal')} role="dialog" aria-modal="true">
                        {showOverlay && (
                            <div
                                className={[s('sheet__overlay'), overlayClassName].filter(Boolean).join(' ')}
                                aria-hidden="true"
                                onClick={closeOnOverlayClick ? close : undefined}
                            />
                        )}

                        <div
                            className={[
                                s('sheet__content'),
                                s(`sheet__content--${position}`),
                                contentClassName,
                            ]
                                .filter(Boolean)
                                .join(' ')}
                            style={width !== undefined ? { width } : undefined}
                        >
                            {closeButton && (
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    iconName="x"
                                    aria-label="Close sheet"
                                    onClick={close}
                                    className={[s('sheet__close'), closeButtonClassName].filter(Boolean).join(' ')}
                                />
                            )}

                            {header && <div className={s('sheet__header')}>{header}</div>}
                            <div className={s('sheet__body')}>{children}</div>
                            {footer && <div className={s('sheet__footer')}>{footer}</div>}
                        </div>
                    </div>,
                    document.body,
                )}
        </>
    );
};

export default Sheet;
