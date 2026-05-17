import { type FC, type SelectHTMLAttributes } from "react";
import "./Select.css";
export interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    description?: string;
    error?: string;
    options: SelectOption[];
    placeholder?: string;
    className?: string;
    containerClassName?: string;
    labelClassName?: string;
    descriptionClassName?: string;
    errorClassName?: string;
    isLoading?: boolean;
}
declare const Select: FC<SelectProps>;
export default Select;
//# sourceMappingURL=Select.d.ts.map