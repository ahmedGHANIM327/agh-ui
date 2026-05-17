import type { FC } from "react";
import Radio from "./Radio";
import type { RadioProps } from "./Radio";
import "./Radio.css";

export interface RadioOption extends Omit<RadioProps, "checked" | "onChange" | "name" | "value"> {
    value: string;
    label: string;
    description?: string;
}

export interface RadioGroupProps {
    label?: string;
    description?: string;
    error?: string;
    options: RadioOption[];
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    name: string;
    className?: string;
    containerClassName?: string;
    labelClassName?: string;
    descriptionClassName?: string;
    errorClassName?: string;
}

const RadioGroup: FC<RadioGroupProps> = ({
                                             label,
                                             description,
                                             error,
                                             options,
                                             value,
                                             onChange,
                                             disabled,
                                             name,
                                             className = "",
                                             containerClassName = "",
                                             labelClassName = "",
                                             descriptionClassName = "",
                                             errorClassName = "",
                                         }) => {
    return (
        <fieldset className={`radio-group ${containerClassName}`.trim()}>
            {label && (
                <legend className={`radio-group__label${error ? " radio-group__label--error" : ""} ${labelClassName}`.trim()}>
                    {label}
                </legend>
            )}

            {description && !error && (
                <p className={`radio-group__description ${descriptionClassName}`.trim()}>
                    {description}
                </p>
            )}

            {error && (
                <p className={`radio-group__description radio-group__description--error ${errorClassName}`.trim()}>
                    {error}
                </p>
            )}

            <div className={`radio-group__items ${className}`.trim()}>
                {options.map(({ value: optionValue, ...option }) => {
                    const radioId = `${name}-${optionValue}`;

                    return (
                        <Radio
                            key={optionValue}
                            {...option}
                            id={radioId}
                            value={optionValue}
                            name={name}
                            disabled={disabled || option.disabled}
                            error={error ? "" : option.error}
                            checked={value === optionValue}
                            onChange={(event) => {
                                if (event.target.checked) {
                                    onChange?.(optionValue);
                                }
                            }}
                        />
                    );
                })}
            </div>
        </fieldset>
    );
};

export default RadioGroup;