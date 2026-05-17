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
declare const Checkbox: FC<CheckboxProps>;
export default Checkbox;
//# sourceMappingURL=Checkbox.d.ts.map