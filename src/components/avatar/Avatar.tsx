import { type ComponentProps, type FC, type ImgHTMLAttributes, useState } from "react";
import Icon from "../icon/Icon";
import Badge from "../badge/Badge";
import type { IconName } from "../../icons/IconRegistry";
import styles from "./Avatar.module.css";

const s = (cls: string): string => styles[cls] ?? '';

export type AvatarVariant = "default" | "primary" | "outline" | "muted";
export type AvatarSize = "small" | "default" | "large" | number;
export type AvatarBadgeProps = ComponentProps<typeof Badge>;

export interface AvatarProps {
    /** Image params (src, alt, title, ...) */
    image?: ImgHTMLAttributes<HTMLImageElement>;
    iconName?: IconName;
    iconSize?: number;
    /** Text shown when there is no image, the image fails to load, or no icon is given */
    fallback?: string;
    variant?: AvatarVariant;
    size?: AvatarSize;
    badge?: AvatarBadgeProps;
    className?: string;
}

const presetSizes: Record<"small" | "default" | "large", number> = {
    small: 32,
    default: 40,
    large: 56,
};

const Avatar: FC<AvatarProps> = ({
    image,
    iconName,
    iconSize,
    fallback,
    variant = "muted",
    size = "default",
    badge,
    className = "",
}) => {
    const [failedSrc, setFailedSrc] = useState<string | undefined>(undefined);

    const px = typeof size === "number" ? size : presetSizes[size];
    const imageFailed = !image?.src || failedSrc === image.src;
    const showImage = !!image && !imageFailed;

    const renderContent = () => {
        if (showImage) {
            return (
                <img
                    {...image}
                    alt={image.alt ?? ""}
                    className={s('avatar__image')}
                    onError={(e) => {
                        setFailedSrc(image.src);
                        image.onError?.(e);
                    }}
                />
            );
        }
        if (iconName) {
            return <Icon name={iconName} size={iconSize ?? Math.round(px * 0.5)} />;
        }
        if (fallback) {
            return <span className={s('avatar__fallback')}>{fallback}</span>;
        }
        return <Icon name="user" size={iconSize ?? Math.round(px * 0.5)} />;
    };

    return (
        <span
            className={[s('avatar'), className].filter(Boolean).join(" ")}
            style={{ width: px, height: px, fontSize: Math.max(10, Math.round(px * 0.4)) }}
        >
            <span className={[s('avatar__shape'), s(`avatar__shape--${variant}`)].join(' ')}>{renderContent()}</span>
            {badge && (
                <span className={s('avatar__badge')}>
                    <Badge size="sm" {...badge} />
                </span>
            )}
        </span>
    );
};

export default Avatar;
