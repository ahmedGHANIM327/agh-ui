import type { FC, InputHTMLAttributes } from "react";
import styles from "./Switch.module.css";

const s = (cls: string): string => styles[cls] ?? '';

export type SwitchVariant = "default" | "outline" | "primary";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    description?: string;
    error?: string;
    variant?: SwitchVariant;
    className?: string;
    containerClassName?: string;
    labelClassName?: string;
    descriptionClassName?: string;
    errorClassName?: string;
}

const Switch: FC<SwitchProps> = ({
    label,
    description,
    error,
    disabled,
    variant = "default",
    className = "",
    containerClassName = "",
    labelClassName = "",
    descriptionClassName = "",
    errorClassName = "",
    id,
    ...props
}) => {
    const switchId = id ?? props.name;
    const hasField = Boolean(label || description || error);

    const input = (
        <input
            {...props}
            id={switchId}
            type="checkbox"
            role="switch"
            disabled={disabled}
            className={s('switch__input')}
        />
    );

    const track = (
        <span
            className={[
                s('switch__track'),
                error ? s('switch__track--error') : '',
            ].filter(Boolean).join(' ')}
        >
            <span className={s('switch__thumb')} />
        </span>
    );

    /* ── Bare switch (no label / description) ── */
    if (!hasField) {
        return (
            <label
                className={[
                    s('switch__bare'),
                    disabled ? s('switch__bare--disabled') : '',
                    className,
                ].filter(Boolean).join(' ')}
            >
                {input}
                {track}
            </label>
        );
    }

    /* ── Field switch (card style) ── */
    return (
        <div
            className={[
                s('switch__container'),
                s(`switch__container--${variant}`),
                disabled ? s('switch__container--disabled') : '',
                error ? s('switch__container--error') : '',
                containerClassName,
            ].filter(Boolean).join(' ')}
        >
            <label htmlFor={switchId} className={s('switch__row')}>
                <span className={s('switch__text')}>
                    {label && (
                        <span
                            className={[
                                s('switch__label'),
                                error ? s('switch__label--error') : '',
                                labelClassName,
                            ].filter(Boolean).join(' ')}
                        >
                            {label}
                        </span>
                    )}
                    {description && !error && (
                        <span
                            className={[
                                s('switch__description'),
                                descriptionClassName,
                            ].filter(Boolean).join(' ')}
                        >
                            {description}
                        </span>
                    )}
                    {error && (
                        <span
                            className={[
                                s('switch__description'),
                                s('switch__description--error'),
                                errorClassName,
                            ].filter(Boolean).join(' ')}
                        >
                            {error}
                        </span>
                    )}
                </span>
                {input}
                {track}
            </label>
        </div>
    );
};

export default Switch;
