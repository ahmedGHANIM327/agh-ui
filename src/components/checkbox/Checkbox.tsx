import type { FC, InputHTMLAttributes } from "react";
import styles from "./Checkbox.module.css";
const s = (cls: string): string => styles[cls] ?? '';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    description?: string;
    error?: string;
    className?: string;
    containerClassName?: string;
    labelClassName?: string;
    descriptionClassName?: string;
    errorClassName?: string;
}

const Checkbox: FC<CheckboxProps> = ({
                                         label,
                                         description,
                                         error,
                                         disabled,
                                         className = "",
                                         containerClassName = "",
                                         labelClassName = "",
                                         descriptionClassName = "",
                                         errorClassName = "",
                                         id,
                                         ...props
                                     }) => {
    const checkboxId = id ?? props.name;

    return (
        <div className={[s('checkbox__container'), containerClassName].filter(Boolean).join(' ')}>
            <label
                className={[
                    s('checkbox__wrapper'),
                    disabled ? s('checkbox__wrapper--disabled') : '',
                    error ? s('checkbox__wrapper--error') : '',
                ].filter(Boolean).join(' ')}
            >
                <input
                    {...props}
                    id={checkboxId}
                    type="checkbox"
                    disabled={disabled}
                    className={[s('checkbox__input'), className].filter(Boolean).join(' ')}
                />

                <span className={s('checkbox__box')} />

                {(label || description) && (
                    <span className={s('checkbox__content')}>
                        {label && (
                            <span className={[s('checkbox__label'), error ? s('checkbox__label--error') : '', labelClassName].filter(Boolean).join(' ')}>
                                {label}
                            </span>
                        )}

                        {description && !error && (
                            <span className={[s('checkbox__description'), descriptionClassName].filter(Boolean).join(' ')}>
                                {description}
                            </span>
                        )}

                        {error && (
                            <span className={[s('checkbox__description'), s('checkbox__description--error'), errorClassName].filter(Boolean).join(' ')}>
                                {error}
                            </span>
                        )}
                    </span>
                )}
            </label>
        </div>
    );
};

export default Checkbox;