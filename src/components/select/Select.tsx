import {type FC, type SelectHTMLAttributes, useState} from "react";
import styles from "./Select.module.css";
import Icon from "../icon/Icon.tsx";
const s = (cls: string): string => styles[cls] ?? '';

export interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    description?: string;
    error?: string;
    options: SelectOption[];
    placeholder?: string;
    className?: string;
    containerClassName?: string;
    labelClassName?: string;
    descriptionClassName?: string;
    errorClassName?: string;
    isLoading?: boolean;
}

const Select: FC<SelectProps> = ({
                                     label,
                                     description,
                                     error,
                                     options,
                                     placeholder,
                                     disabled,
                                     className = "",
                                     containerClassName = "",
                                     labelClassName = "",
                                     descriptionClassName = "",
                                     errorClassName = "",
                                     isLoading,
                                     id,
                                     ...props
                                 }) => {
    const selectId = id ?? props.name;

    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={[s('select__container'), containerClassName].filter(Boolean).join(' ')}>
            {label && (
                <label
                    htmlFor={selectId}
                    className={[s('select__label'), error ? s('select__label--error') : '', labelClassName].filter(Boolean).join(' ')}
                >
                    {label}
                </label>
            )}

            <div
                className={[
                    s('select__wrapper'),
                    error ? s('select__wrapper--error') : '',
                    disabled ? s('select__wrapper--disabled') : '',
                ].filter(Boolean).join(' ')}
            >
                <select
                    {...props}
                    id={selectId}
                    disabled={disabled || isLoading}
                    className={[s('select__field'), className].filter(Boolean).join(' ')}
                    onFocus={(event) => {
                        setIsFocused(true);
                        props.onFocus?.(event);
                    }}
                    onBlur={(event) => {
                        setIsFocused(false);
                        props.onBlur?.(event);
                    }}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}

                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>

                <span
                    className={[s('select__icon'), isFocused ? s('select__icon--open') : ''].filter(Boolean).join(' ')}
                    aria-hidden="true"
                >
                    <Icon
                        name={isLoading ? 'spinner' : 'chevronDown'}
                        size={16}
                    />
                </span>
            </div>

            {error && (
                <p className={[s('select__description'), s('select__description--error'), errorClassName].filter(Boolean).join(' ')}>
                    {error}
                </p>
            )}

            {description && !error && (
                <p className={[s('select__description'), descriptionClassName].filter(Boolean).join(' ')}>
                    {description}
                </p>
            )}
        </div>
    );
};

export default Select;