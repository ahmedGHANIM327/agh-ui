import type { FC } from "react";
import type { IconProps } from "../types.ts";

const CheckCircleIcon: FC<IconProps> = ({
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
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
};

export default CheckCircleIcon;