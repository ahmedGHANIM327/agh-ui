import type { FC } from "react";
import type { IconProps } from "../types.ts";

const SlackIcon: FC<IconProps> = ({
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
                d="M8.5 2.5A2.5 2.5 0 1 0 8.5 7H10V5a2.5 2.5 0 0 0-1.5-2.5ZM15.5 2.5A2.5 2.5 0 1 0 13 5v1.5h2.5A2.5 2.5 0 0 0 15.5 2.5ZM2.5 8.5A2.5 2.5 0 1 0 5 6h1.5v2.5H2.5ZM21.5 8.5A2.5 2.5 0 1 0 19 11h-1.5V8.5h4ZM8.5 21.5A2.5 2.5 0 1 0 11 19v-1.5H8.5v4ZM15.5 21.5A2.5 2.5 0 1 0 13 19v-1.5h2.5v4ZM2.5 15.5A2.5 2.5 0 1 0 5 13h1.5v2.5H2.5ZM21.5 15.5A2.5 2.5 0 1 0 19 13h-1.5v2.5h4Z"
            />
            <rect
                x="10"
                y="10"
                width="4"
                height="4"
                rx="1"
                fill={color}
            />
        </svg>
    );
};

export default SlackIcon;

