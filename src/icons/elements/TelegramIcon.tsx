import type { FC } from "react";
import type { IconProps } from "../types.ts";

const TelegramIcon: FC<IconProps> = ({
    size = 18,
    color = "currentColor",
    className = "",
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={className}
        >
            <path
                fill={color}
                d="M21.9 3.4 18.6 20c-.25 1.18-.9 1.47-1.82.91l-5.01-3.69-2.42 2.33c-.27.27-.5.5-1.03.5l.37-5.1 9.28-8.38c.4-.37-.09-.57-.62-.2L5.88 13.7.95 12.16c-1.07-.33-1.09-1.07.22-1.58L20.45 2.95c.89-.33 1.67.2 1.45.45Z"
            />
        </svg>
    );
};

export default TelegramIcon;
