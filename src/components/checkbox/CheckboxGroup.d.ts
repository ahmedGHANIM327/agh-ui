import type { FC } from "react";
import type { CheckboxProps } from "./Checkbox";
import "./Checkbox.css";
export interface CheckboxOption extends Omit<CheckboxProps, "checked" | "onChange"> {
    value: string;
    label: string;
    description?: string;
}
export interface CheckboxGroupProps {
    label?: string;
    description?: string;
    error?: string;
    options: CheckboxOption[];
    value?: string[];
    onChange?: (value: string[]) => void;
    disabled?: boolean;
    name?: string;
    className?: string;
    containerClassName?: string;
    labelClassName?: string;
    descriptionClassName?: string;
    errorClassName?: string;
}
declare const CheckboxGroup: FC<CheckboxGroupProps>;
export default CheckboxGroup;
//# sourceMappingURL=CheckboxGroup.d.ts.map