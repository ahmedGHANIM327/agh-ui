import {type FC, type SelectHTMLAttributes, useState} from "react";
import "./Select.css";
import Icon from "../icon/Icon.tsx";

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
        <div className={`select__container ${containerClassName}`.trim()}>
            {label && (
                <label
                    htmlFor={selectId}
                    className={`select__label${error ? " select__label--error" : ""} ${labelClassName}`.trim()}
                >
                    {label}
                </label>
            )}

            <div
                className={[
                    "select__wrapper",
                    error ? "select__wrapper--error" : "",
                    disabled ? "select__wrapper--disabled" : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                <select
                    {...props}
                    id={selectId}
                    disabled={disabled || isLoading}
                    className={`select__field ${className}`.trim()}
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
                    className={`select__icon ${
                        isFocused ? "select__icon--open" : ""
                    }`}
                    aria-hidden="true"
                >
                    <Icon
                        name={isLoading ? 'spinner' : 'chevronDown'}
                        size={16}
                    />
                </span>
            </div>

            {error && (
                <p className={`select__description select__description--error ${errorClassName}`.trim()}>
                    {error}
                </p>
            )}

            {description && !error && (
                <p className={`select__description ${descriptionClassName}`.trim()}>
                    {description}
                </p>
            )}
        </div>
    );
};

export default Select;