import type { FC } from "react";
import Checkbox from "./Checkbox";
import type { CheckboxProps } from "./Checkbox";
import "./Checkbox.css";

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
        <fieldset className={`checkbox-group ${containerClassName}`.trim()}>
            {label && (
                <legend className={`checkbox-group__label${error ? " checkbox-group__label--error" : ""} ${labelClassName}`.trim()}>
                    {label}
                </legend>
            )}

            {description && !error && (
                <p className={`checkbox-group__description ${descriptionClassName}`.trim()}>
                    {description}
                </p>
            )}

            {error && (
                <p className={`checkbox-group__description checkbox-group__description--error ${errorClassName}`.trim()}>
                    {error}
                </p>
            )}

            <div className={`checkbox-group__items ${className}`.trim()}>
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