import type {FC} from "react";
import styles from './Textarea.module.css';
const s = (cls: string): string => styles[cls] ?? '';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    placeholder?: string;
    label?: string;
    description?: string;
    error?: string;
    className?: string;
    containerClassName?: string;
    labelClassName?: string;
    descriptionClassName?: string;
    errorClassName?: string;
}

const Textarea: FC<TextareaProps> = ({
                                         label,
                                         description,
                                         error,
                                         className = '',
                                         errorClassName = '',
                                         descriptionClassName = '',
                                         labelClassName = '',
                                         containerClassName = '',
                                         ...props
                                     }) => {
    return (
        <div className={[s('textarea__container'), containerClassName].filter(Boolean).join(' ')}>
            {label && (
                <label className={[s('textarea__label'), error ? s('textarea__label--error') : '', labelClassName].filter(Boolean).join(' ')}>
                    {label}
                </label>
            )}
            <textarea
                {...props}
                className={[s('textarea__textarea'), error ? s('textarea__textarea--error') : '', className].filter(Boolean).join(' ')}
            />
            {error && <p className={[s('textarea__description'), s('textarea__description--error'), errorClassName].filter(Boolean).join(' ')}>{error}</p>}
            {description && <p className={[s('textarea__description'), descriptionClassName].filter(Boolean).join(' ')}>{description}</p>}
        </div>
    );
};

export default Textarea;