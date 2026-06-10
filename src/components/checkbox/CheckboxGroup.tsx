import type { FC } from "react";
import Checkbox from "./Checkbox";
import type { CheckboxProps } from "./Checkbox";
import styles from "./Checkbox.module.css";
const s = (cls: string): string => styles[cls] ?? '';

export interface CheckboxOption extends Omit<CheckboxProps, "checked" | "onChange"> {
    value: string;
    label: string;
    description?: string;
}

export interface CheckboxGroupProps {
    label?: string;
    description?: string;
    error?: string;
    options: CheckboxOption[];
    value?: string[];
    onChange?: (value: string[]) => void;
    disabled?: boolean;
    name?: string;
    className?: string;
    containerClassName?: string;
    labelClassName?: string;
    descriptionClassName?: string;
    errorClassName?: string;
}

const CheckboxGroup: FC<CheckboxGroupProps> = ({
                                                   label,
                                                   description,
                                                   error,
                                                   options,
                                                   value = [],
                                                   onChange,
                                                   disabled,
                                                   name,
                                                   className = "",
                                                   containerClassName = "",
                                                   labelClassName = "",
                                                   descriptionClassName = "",
                                                   errorClassName = "",
                                               }) => {
    const handleChange = (optionValue: string, checked: boolean) => {
        if (!onChange) return;

        if (checked) {
            onChange([...value, optionValue]);
            return;
        }

        onChange(value.filter((item) => item !== optionValue));
    };

    return (
        <fieldset className={[s('checkbox-group'), containerClassName].filter(Boolean).join(' ')}>
            {label && (
                <legend className={[s('checkbox-group__label'), error ? s('checkbox-group__label--error') : '', labelClassName].filter(Boolean).join(' ')}>
                    {label}
                </legend>
            )}

            {description && !error && (
                <p className={[s('checkbox-group__description'), descriptionClassName].filter(Boolean).join(' ')}>
                    {description}
                </p>
            )}

            {error && (
                <p className={[s('checkbox-group__description'), s('checkbox-group__description--error'), errorClassName].filter(Boolean).join(' ')}>
                    {error}
                </p>
            )}

            <div className={[s('checkbox-group__items'), className].filter(Boolean).join(' ')}>
                {options.map((option) => (
                    <Checkbox
                        key={option.value}
                        {...option}
                        name={name}
                        disabled={disabled || option.disabled}
                        error={error ? "" : option.error}
                        checked={value.includes(option.value)}
                        onChange={(event) => handleChange(option.value, event.target.checked)}
                    />
                ))}
            </div>
        </fieldset>
    );
};

export default CheckboxGroup;