import type { AnchorHTMLAttributes, ComponentProps, FC, KeyboardEvent, ReactNode } from "react";
import Icon from "../icon/Icon";
import Badge from "../badge/Badge";
import type { IconName } from "../../icons/IconRegistry";
import styles from "./Item.module.css";

const s = (cls: string): string => styles[cls] ?? '';

export type ItemVariant = "default" | "primary" | "outline" | "ghost";
export type ItemSize = "lg" | "default" | "sm";
export type ItemBadgeProps = ComponentProps<typeof Badge>;

export interface ItemProps {
    label: string;
    description?: string;
    /** Icon displayed on the left of the label */
    iconName?: IconName;
    /** Media (image, avatar...) displayed on the left side, the text is vertically centered next to it */
    media?: ReactNode;
    /** Badge displayed on the right of the label */
    badge?: ItemBadgeProps;
    /** Right side: text, button, icon button... */
    right?: ReactNode;
    variant?: ItemVariant;
    size?: ItemSize;
    /** Makes the item an action */
    onClick?: () => void;
    /** Makes the item a link */
    to?: string;
    target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
    rel?: string;
    disabled?: boolean;
    className?: string;
}

const iconSizes: Record<ItemSize, number> = {
    lg: 20,
    default: 16,
    sm: 14,
};

const Item: FC<ItemProps> = ({
    label,
    description,
    iconName,
    media,
    badge,
    right,
    variant = "default",
    size = "default",
    onClick,
    to,
    target,
    rel,
    disabled = false,
    className = "",
}) => {
    const isLink = !!to && !disabled;
    const isAction = !!onClick && !to && !disabled;
    const interactive = isLink || isAction;

    const classes = [
        s('item'),
        s(`item--${variant}`),
        s(`item--${size}`),
        interactive ? s('item--interactive') : '',
        disabled ? s('item--disabled') : '',
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const content = (
        <>
            <span className={s('item__left')}>
                {media && <span className={s('item__media')}>{media}</span>}
                {iconName && (
                    <span className={s('item__icon')}>
                        <Icon name={iconName} size={iconSizes[size]} />
                    </span>
                )}
                <span className={s('item__text')}>
                    <span className={s('item__title')}>
                        <span className={s('item__label')}>{label}</span>
                        {badge && <Badge size="sm" {...badge} />}
                    </span>
                    {description && <span className={s('item__description')}>{description}</span>}
                </span>
            </span>
            {right && (
                <span
                    className={s('item__right')}
                    onClick={interactive ? (e) => e.stopPropagation() : undefined}
                >
                    {right}
                </span>
            )}
        </>
    );

    if (isLink) {
        return (
            <a href={to} target={target} rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)} className={classes}>
                {content}
            </a>
        );
    }

    if (isAction) {
        return (
            <div
                className={classes}
                role="button"
                tabIndex={0}
                onClick={onClick}
                onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                    if (e.target !== e.currentTarget) return;
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onClick();
                    }
                }}
            >
                {content}
            </div>
        );
    }

    return (
        <div className={classes} aria-disabled={disabled || undefined}>
            {content}
        </div>
    );
};

export default Item;
