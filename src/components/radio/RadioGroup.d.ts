import type { FC } from "react";
import type { RadioProps } from "./Radio";
import "./Radio.css";
export interface RadioOption extends Omit<RadioProps, "checked" | "onChange" | "name" | "value"> {
    value: string;
    label: string;
    description?: string;
}
export interface RadioGroupProps {
    label?: string;
    description?: string;
    error?: string;
    options: RadioOption[];
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    name: string;
    className?: string;
    containerClassName?: string;
    labelClassName?: string;
    descriptionClassName?: string;
    errorClassName?: string;
}
declare const RadioGroup: FC<RadioGroupProps>;
export default RadioGroup;
//# sourceMappingURL=RadioGroup.d.ts.map