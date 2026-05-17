import type { FC } from "react";
import type { IconProps } from "../types.ts";

const SpinnerIcon: FC<IconProps> = ({
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
            className={`animate-spin spinner-icon ${className}`}
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    );
};

export default SpinnerIcon;
