import type { FC, InputHTMLAttributes } from "react";
import "./Radio.css";
export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    description?: string;
    error?: string;
    className?: string;
    containerClassName?: string;
    labelClassName?: string;
    descriptionClassName?: string;
    errorClassName?: string;
}
declare const Radio: FC<RadioProps>;
export default Radio;
//# sourceMappingURL=Radio.d.ts.map