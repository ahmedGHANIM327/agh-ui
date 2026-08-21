import type { FC } from "react";
import type { IconProps } from "../types.ts";

const ArrowDownAZIcon: FC<IconProps> = ({
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
            <path d="m3 16 4 4 4-4" />
            <path d="M7 20V4" />
            <path d="M11 4h4" />
            <path d="M11 8h6" />
            <path d="M11 12h8" />
        </svg>
    );
};

export default ArrowDownAZIcon;