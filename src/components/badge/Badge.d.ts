import type { FC } from "react";
import type { IconName } from "../../icons/IconRegistry.ts";
import "./Badge.css";
type BadgeVariant = "default" | "primary" | "outline" | "destructive";
type BadgeSize = "default" | "sm" | "lg";
type IconPosition = "left" | "right";
interface BadgeProps {
    variant?: BadgeVariant;
    size?: BadgeSize;
    label?: string;
    iconName?: IconName;
    iconSize?: number;
    iconPosition?: IconPosition;
    className?: string;
}
declare const Badge: FC<BadgeProps>;
export default Badge;
//# sourceMappingURL=Badge.d.ts.map