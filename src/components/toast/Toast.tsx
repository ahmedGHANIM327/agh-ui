import {
    type ReactNode,
    useEffect,
    useMemo,
    useState,
} from "react";
import { createPortal } from "react-dom";
import styles from "./Toast.module.css";
import type { IconName } from "../../icons/IconRegistry";
import Icon from "../icon/Icon";
import Button from "../button/Button";
const s = (cls: string): string => styles[cls] ?? '';

type ToastPosition =
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";

type ToastTypes =
    | "default"
    | "success"
    | "warning"
    | "error";

export type ToastOptions = {
    description?: string;
    iconName?: IconName;
    position?: ToastPosition;
    type?: ToastTypes;
    duration?: number;
    autoClose?: boolean;
    // css classes
    labelClassName?: string;
    descriptionClassName?: string;
    containerClassName?: string;
    iconClassName?: string;
    closeButtonClassName?: string;
};

type ToastItem = ToastOptions & {
    id: string;
    label: string;
};

type ToastListener = (toasts: ToastItem[]) => void;

const DEFAULT_POSITION: ToastPosition = "top-center";
const DEFAULT_DURATION = 3000;

let toasts: ToastItem[] = [];
const listeners = new Set<ToastListener>();
const timeouts = new Map<string, ReturnType<typeof setTimeout>>();

const notify = () => {
    listeners.forEach((listener) => listener([...toasts]));
};

const dismissToast = (id: string) => {
    const timeout = timeouts.get(id);

    if (timeout) {
        clearTimeout(timeout);
        timeouts.delete(id);
    }

    toasts = toasts.filter((toastItem) => toastItem.id !== id);
    notify();
};

// eslint-disable-next-line react-refresh/only-export-components
export const toast = (
    label: string,
    options: ToastOptions = {},
) => {
    const id = crypto.randomUUID();

    const newToast: ToastItem = {
        id,
        label,
        description: options.description,
        iconName: options.iconName,
        position: options.position ?? DEFAULT_POSITION,
        duration: options.duration ?? DEFAULT_DURATION,
        autoClose: options.autoClose ?? true,
        type: options.type ?? "default",
        containerClassName: options.containerClassName,
        descriptionClassName: options.descriptionClassName,
        iconClassName: options.iconClassName,
        labelClassName: options.labelClassName,
        closeButtonClassName: options.closeButtonClassName,
    };

    toasts = [...toasts, newToast];
    notify();

    if (newToast.autoClose) {
        const timeout = setTimeout(() => {
            dismissToast(id);
        }, newToast.duration);

        timeouts.set(id, timeout);
    }

    return id;
};

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
    const [items, setItems] = useState<ToastItem[]>([]);

    useEffect(() => {
        listeners.add(setItems);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems([...toasts]);

        return () => {
            listeners.delete(setItems);
        };
    }, []);

    const groupedToasts = useMemo(() => {
        return items.reduce<Record<ToastPosition, ToastItem[]>>(
            (acc, item) => {
                acc[item.position ?? 'top-center'].push(item);
                return acc;
            },
            {
                "top-left": [],
                "top-center": [],
                "top-right": [],
                "bottom-left": [],
                "bottom-center": [],
                "bottom-right": [],
            },
        );
    }, [items]);

    return (
        <>
            {children}

            {createPortal(
                <>
                    {Object.entries(groupedToasts).map(([position, toastItems]) => {
                        if (!toastItems.length) {
                            return null;
                        }

                        return (
                            <ToastViewport
                                key={position}
                                position={position as ToastPosition}
                            >
                                {toastItems.map((item) => (
                                    <Toast
                                        key={item.id}
                                        id={item.id}
                                        label={item.label}
                                        description={item.description}
                                        iconName={item.iconName}
                                        autoClose={item.autoClose}
                                        type={item.type}
                                        closeButtonClassName={item.closeButtonClassName}
                                        containerClassName={item.containerClassName}
                                        descriptionClassName={item.descriptionClassName}
                                        iconClassName={item.iconClassName}
                                        labelClassName={item.labelClassName}
                                    />
                                ))}
                            </ToastViewport>
                        );
                    })}
                </>,
                document.body,
            )}
        </>
    );
};

interface ToastViewportProps {
    children: ReactNode;
    position: ToastPosition;
}

const ToastViewport = ({
                           children,
                           position,
                       }: ToastViewportProps) => {
    return (
        <div className={[s('toast-viewport'), s(`toast-viewport--${position}`)].join(' ')}>
            {children}
        </div>
    );
};

const Toast = ({
                   id,
                   label,
                   description,
                   iconName,
                   type = "default",
                   autoClose = true,
                   labelClassName = "",
                   descriptionClassName = "",
                   containerClassName = "",
                   iconClassName = "",
                   closeButtonClassName = "",
               }: ToastItem) => {

    const  nameIcon = iconName ?? ( type !== "default" ? {
        success: "check",
        error: "x",
        warning: "alertTriangle"
    }[type] as IconName : undefined);

    return (
        <div className={[s('toast__container'), containerClassName].filter(Boolean).join(' ')} role="status" aria-live="polite">
            {nameIcon && (
                <Icon name={nameIcon} className={iconClassName} />
            )}

            <div className={s('toast__content')}>
                <p className={[s('toast__label'), labelClassName].filter(Boolean).join(' ')}>
                    {label}
                </p>

                {description && (
                    <p className={[s('toast__description'), descriptionClassName].filter(Boolean).join(' ')}>
                        {description}
                    </p>
                )}
            </div>

            {!autoClose && (
                <Button
                    size="icon"
                    variant="ghost"
                    iconName="x"
                    aria-label="Close toast"
                    onClick={() => dismissToast(id)}
                    className={[s('toast__close'), closeButtonClassName].filter(Boolean).join(' ')}
                />
            )}
        </div>
    );
};