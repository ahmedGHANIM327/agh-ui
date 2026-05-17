import type { FC } from "react";
import Icon from "../icon/Icon.tsx";
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

const Badge: FC<BadgeProps> = ({
                                   variant = "default",
                                   size = "default",
                                   label,
                                   iconName,
                                   iconSize,
                                   iconPosition = "left",
                                   className = "",
                               }) => {

    const iconSizes: Record<BadgeSize, number> = {
        default: 12,
        sm: 10,
        lg: 14,
    };

    const resolvedIconSize = iconSize ?? iconSizes[size];

    const iconEl = iconName ? (
        <Icon name={iconName} size={resolvedIconSize} />
    ) : null;

    const classes = [
        "badge",
        `badge--${variant}`,
        `badge--${size}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <span className={classes}>
            {iconPosition === "left" && iconEl}

            {label && (
                <span className="badge__label">
                    {label}
                </span>
            )}

            {iconPosition === "right" && iconEl}
        </span>
    );
};

export default Badge;