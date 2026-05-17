import type { FC, ButtonHTMLAttributes } from "react";
import type { IconName } from "../../icons/IconRegistry.ts";
import "./Button.css";
type ButtonVariant = "default" | "primary" | "outline" | "destructive" | "link" | "ghost";
type ButtonSize = "default" | "lg" | "sm" | "icon";
type IconPosition = "left" | "right";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    label?: string;
    iconName?: IconName;
    iconSize?: number;
    iconPosition?: IconPosition;
    isLoading?: boolean;
}
declare const Button: FC<ButtonProps>;
export default Button;
//# sourceMappingURL=Button.d.ts.map