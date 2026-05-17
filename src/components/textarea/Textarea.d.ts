import type { FC } from "react";
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
declare const Textarea: FC<TextareaProps>;
export default Textarea;
//# sourceMappingURL=Textarea.d.ts.map