import {type FC, useState} from "react";
import './Input.css';
import Icon from "../icon/Icon.tsx";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    description?: string;
    error?: string;
    className?: string;
    containerClassName?: string;
    labelClassName?: string;
    descriptionClassName?: string;
    errorClassName?: string;
}

const Input: FC<InputProps> = ({
                                   label,
                                   description,
                                   disabled,
                                   error,
                                   type,
                                   className = '',
                                   errorClassName = '',
                                   descriptionClassName = '',
                                   labelClassName = '',
                                   containerClassName = '',
                                   ...props
                               }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const isPasswordType = type === 'password';

    const passwordToggleButton = isPasswordType ? (
        <button
            type="button"
            className={`input__password-toggle${error ? ' input__password-toggle--error' : ''}`}
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            disabled={disabled}
            aria-label={isPasswordVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        >
            <Icon
                name={isPasswordVisible ? "eyeOff" : "eye"}
                size={16}
            />
        </button>
    ) : null;

    return (
        <div className={`input__container ${containerClassName.trim()}`}>
            {label && (
                <label className={`input__label${error ? ' input__label--error' : ''} ${labelClassName.trim()}`}>
                    {label}
                </label>
            )}
            <div className={[
                'input__wrapper',
                error ? 'input__wrapper--error' : '',
                disabled ? 'input__wrapper--disabled' : '',
                isFocused ? 'input__wrapper--focused' : '',
            ].filter(Boolean).join(' ')}>
                <input
                    {...props}
                    disabled={disabled}
                    onFocus={(e) => { setIsFocused(true); props.onFocus?.(e); }}
                    onBlur={(e) => { setIsFocused(false); props.onBlur?.(e); }}
                    className={`input__field${error ? ' input__field--error' : ''} ${className}`.trim()}
                    type={isPasswordType ? (isPasswordVisible ? 'text' : 'password') : type}
                />
                {passwordToggleButton}
            </div>
            {error && <p className={`input__description input__description--error ${errorClassName.trim()}`}>{error}</p>}
            {description && !error && <p className={`input__description ${descriptionClassName.trim()}`}>{description}</p>}
        </div>
    );
};


export default Input;
