import type { FC } from "react";
import type { IconProps } from "../types.ts";

const ShieldCheckIcon: FC<IconProps> = ({
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
            <path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
};

export default ShieldCheckIcon;