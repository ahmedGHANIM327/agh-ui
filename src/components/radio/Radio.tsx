import type { FC, InputHTMLAttributes } from "react";
import "./Radio.css";

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
        <div className={`radio__container ${containerClassName}`.trim()}>
            <label
                className={[
                    "radio__wrapper",
                    disabled ? "radio__wrapper--disabled" : "",
                    error ? "radio__wrapper--error" : "",
                ].filter(Boolean).join(" ")}
                htmlFor={radioId}
            >
                <input
                    {...props}
                    id={radioId}
                    type="radio"
                    checked={checked}
                    disabled={disabled}
                    className={`radio__input ${className}`.trim()}
                />

                <span className={["radio__circle", checked ? "radio__circle--checked" : ""].filter(Boolean).join(" ")} />

                {(label || description || error) && (
                    <span className="radio__content">
                        {label && (
                            <span className={`radio__label ${labelClassName}`.trim()}>
                                {label}
                            </span>
                        )}

                        {description && !error && (
                            <span className={`radio__description ${descriptionClassName}`.trim()}>
                                {description}
                            </span>
                        )}

                        {error && (
                            <span className={`radio__description radio__description--error ${errorClassName}`.trim()}>
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