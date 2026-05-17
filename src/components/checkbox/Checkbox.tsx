import type { FC, InputHTMLAttributes } from "react";
import "./Checkbox.css";

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
        <div className={`checkbox__container ${containerClassName}`.trim()}>
            <label
                className={[
                    "checkbox__wrapper",
                    disabled ? "checkbox__wrapper--disabled" : "",
                    error ? "checkbox__wrapper--error" : "",
                ].filter(Boolean).join(" ")}
            >
                <input
                    {...props}
                    id={checkboxId}
                    type="checkbox"
                    disabled={disabled}
                    className={`checkbox__input ${className}`.trim()}
                />

                <span className="checkbox__box" />

                {(label || description) && (
                    <span className="checkbox__content">
                        {label && (
                            <span className={`checkbox__label ${error ? 'checkbox__label--error' : ''} ${labelClassName}`.trim()}>
                                {label}
                            </span>
                        )}

                        {description && !error && (
                            <span className={`checkbox__description ${descriptionClassName}`.trim()}>
                                {description}
                            </span>
                        )}

                        {error && (
                            <span className={`checkbox__description checkbox__description--error ${errorClassName}`.trim()}>
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