import type { FC, InputHTMLAttributes } from "react";
import styles from "./Radio.module.css";
const s = (cls: string): string => styles[cls] ?? '';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    description?: string;
    error?: string;
    className?: string;
    containerClassName?: string;
    labelClassName?: string;
    descriptionClassName?: string;
    errorClassName?: string;
}

const Radio: FC<RadioProps> = ({
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
                                   checked,
                                   ...props
                               }) => {
    const radioId = id ?? `${props.name}-${props.value}`;

    return (
        <div className={[s('radio__container'), containerClassName].filter(Boolean).join(' ')}>
            <label
                className={[
                    s('radio__wrapper'),
                    disabled ? s('radio__wrapper--disabled') : '',
                    error ? s('radio__wrapper--error') : '',
                ].filter(Boolean).join(' ')}
                htmlFor={radioId}
            >
                <input
                    {...props}
                    id={radioId}
                    type="radio"
                    checked={checked}
                    disabled={disabled}
                    className={[s('radio__input'), className].filter(Boolean).join(' ')}
                />

                <span className={[s('radio__circle'), checked ? s('radio__circle--checked') : ''].filter(Boolean).join(' ')} />

                {(label || description || error) && (
                    <span className={s('radio__content')}>
                        {label && (
                            <span className={[s('radio__label'), labelClassName].filter(Boolean).join(' ')}>
                                {label}
                            </span>
                        )}

                        {description && !error && (
                            <span className={[s('radio__description'), descriptionClassName].filter(Boolean).join(' ')}>
                                {description}
                            </span>
                        )}

                        {error && (
                            <span className={[s('radio__description'), s('radio__description--error'), errorClassName].filter(Boolean).join(' ')}>
                                {error}
                            </span>
                        )}
                    </span>
                )}
            </label>
        </div>
    );
};

export default Radio;