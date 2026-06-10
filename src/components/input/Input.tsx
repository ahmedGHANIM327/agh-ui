import {type FC, useState} from "react";
import styles from './Input.module.css';
import Icon from "../icon/Icon.tsx";

const s = (cls: string): string => styles[cls] ?? '';

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
            className={[s('input__password-toggle'), error ? s('input__password-toggle--error') : ''].filter(Boolean).join(' ')}
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
        <div className={[s('input__container'), containerClassName].filter(Boolean).join(' ')}>
            {label && (
                <label className={[s('input__label'), error ? s('input__label--error') : '', labelClassName].filter(Boolean).join(' ')}>
                    {label}
                </label>
            )}
            <div className={[
                s('input__wrapper'),
                error ? s('input__wrapper--error') : '',
                disabled ? s('input__wrapper--disabled') : '',
                isFocused ? s('input__wrapper--focused') : '',
            ].filter(Boolean).join(' ')}>
                <input
                    {...props}
                    disabled={disabled}
                    onFocus={(e) => { setIsFocused(true); props.onFocus?.(e); }}
                    onBlur={(e) => { setIsFocused(false); props.onBlur?.(e); }}
                    className={[s('input__field'), error ? s('input__field--error') : '', className].filter(Boolean).join(' ')}
                    type={isPasswordType ? (isPasswordVisible ? 'text' : 'password') : type}
                />
                {passwordToggleButton}
            </div>
            {error && <p className={[s('input__description'), s('input__description--error'), errorClassName].filter(Boolean).join(' ')}>{error}</p>}
            {description && !error && <p className={[s('input__description'), descriptionClassName].filter(Boolean).join(' ')}>{description}</p>}
        </div>
    );
};


export default Input;
