import type { FC } from "react";
import type { IconProps } from "../types.ts";

const FilterXIcon: FC<IconProps> = ({
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
            <path d="M4 6h16" />
            <path d="M7 12h7" />
            <path d="M10 18h2" />
            <path d="m17 14 4 4" />
            <path d="m21 14-4 4" />
        </svg>
    );
};

export default FilterXIcon;