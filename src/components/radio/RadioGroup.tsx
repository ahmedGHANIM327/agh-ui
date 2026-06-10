import type { FC } from "react";
import Radio from "./Radio";
import type { RadioProps } from "./Radio";
import styles from "./Radio.module.css";
const s = (cls: string): string => styles[cls] ?? '';

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
        <fieldset className={[s('radio-group'), containerClassName].filter(Boolean).join(' ')}>
            {label && (
                <legend className={[s('radio-group__label'), error ? s('radio-group__label--error') : '', labelClassName].filter(Boolean).join(' ')}>
                    {label}
                </legend>
            )}

            {description && !error && (
                <p className={[s('radio-group__description'), descriptionClassName].filter(Boolean).join(' ')}>
                    {description}
                </p>
            )}

            {error && (
                <p className={[s('radio-group__description'), s('radio-group__description--error'), errorClassName].filter(Boolean).join(' ')}>
                    {error}
                </p>
            )}

            <div className={[s('radio-group__items'), className].filter(Boolean).join(' ')}>
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