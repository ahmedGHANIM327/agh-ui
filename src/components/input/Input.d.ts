import { type FC } from "react";
import './Input.css';
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
declare const Input: FC<InputProps>;
export default Input;
//# sourceMappingURL=Input.d.ts.map