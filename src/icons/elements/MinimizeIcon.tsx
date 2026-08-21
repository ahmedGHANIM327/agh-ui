import type { FC } from "react";
import type { IconProps } from "../types.ts";

const MinimizeIcon: FC<IconProps> = ({
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
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M8 3v5H3" />
            <path d="M21 8h-5V3" />
            <path d="M3 16h5v5" />
            <path d="M16 21v-5h5" />
        </svg>
    );
};

export default MinimizeIcon;