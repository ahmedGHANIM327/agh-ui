import type {FC} from "react";
import './Textarea.css';

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
        <div className={`textarea__container ${containerClassName.trim()}`}>
            {label && (
                <label className={`textarea__label${error ? ' textarea__label--error' : ''} ${labelClassName.trim()}`}>
                    {label}
                </label>
            )}
            <textarea
                {...props}
                className={`textarea__textarea${error ? ' textarea__textarea--error' : ''} ${className}`.trim()}
            />
            {error && <p className={`textarea__description textarea__description--error ${errorClassName.trim()}`}>{error}</p>}
            {description && <p className={`textarea__description ${descriptionClassName.trim()}`}>{description}</p>}
        </div>
    );
};

export default Textarea;