import type { FC, ButtonHTMLAttributes } from "react";
import Icon from "../icon/Icon.tsx";
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

const Button: FC<ButtonProps> = ({
                                     variant = "default",
                                     size = "default",
                                     label,
                                     iconName,
                                     iconSize,
                                     iconPosition = "left",
                                     disabled,
                                     isLoading = false,
                                     className = "",
                                     ...props
                                 }) => {
    const iconSizes: Record<ButtonSize, number> = {
        default: 16,
        sm: 14,
        lg: 22,
        icon: 18,
    };

    const isIconOnly = size === "icon";
    const resolvedIconSize = iconSize ?? iconSizes[size];

    const iconEl = iconName ? (
        <Icon name={iconName} size={resolvedIconSize} />
    ) : null;

    const classes = [
        "button",
        `button--${variant}`,
        `button--${size}`,
        isLoading ? "button--loading" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            {...props}
            disabled={disabled || isLoading}
            className={classes}
        >
            {isLoading && (
                <Icon name="spinner" size={resolvedIconSize} />
            )}

            {!isLoading && isIconOnly && iconEl}

            {!isIconOnly && (
                <>
                    {!isLoading && iconPosition === "left" && iconEl}

                    {label && (
                        <span className="button__label">
                            {label}
                        </span>
                    )}

                    {!isLoading && iconPosition === "right" && iconEl}
                </>
            )}
        </button>
    );
};

export default Button;