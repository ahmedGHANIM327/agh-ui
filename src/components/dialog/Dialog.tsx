import {
    type ReactNode,
    useEffect,
    useCallback,
} from "react";
import { createPortal } from "react-dom";
import styles from "./Dialog.module.css";
import Button from "../button/Button";

const s = (cls: string): string => styles[cls] ?? '';

export interface DialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
    showOverlay?: boolean;
    overlayClassName?: string;
    contentClassName?: string;
    trigger?: ReactNode;
    closeOnOverlayClick?: boolean;
    closeOnEsc?: boolean;
    closeButton?: boolean;
    closeButtonClassName?: string;
}

const Dialog = ({
    isOpen,
    onOpenChange,
    children,
    showOverlay = true,
    overlayClassName = "",
    contentClassName = "",
    trigger,
    closeOnOverlayClick = false,
    closeOnEsc = true,
    closeButton = true,
    closeButtonClassName = "",
}: DialogProps) => {
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
                    className={s('dialog__trigger')}
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
                    <div className={s('dialog__portal')} role="dialog" aria-modal="true">
                        {showOverlay && (
                            <div
                                className={[s('dialog__overlay'), overlayClassName].filter(Boolean).join(' ')}
                                aria-hidden="true"
                                onClick={closeOnOverlayClick ? close : undefined}
                            />
                        )}

                        <div
                            className={[s('dialog__content'), contentClassName].filter(Boolean).join(' ')}
                        >
                            {closeButton && (
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    iconName="x"
                                    aria-label="Close dialog"
                                    onClick={close}
                                    className={[s('dialog__close'), closeButtonClassName].filter(Boolean).join(' ')}
                                />
                            )}

                            {children}
                        </div>
                    </div>,
                    document.body,
                )}
        </>
    );
};

export default Dialog;
