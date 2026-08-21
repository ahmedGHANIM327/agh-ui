import type { FC } from "react";
import type { IconProps } from "../types.ts";

const KeyIcon: FC<IconProps> = ({
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
            <circle cx="7.5" cy="15.5" r="5.5" />
            <path d="m21 2-9.6 9.6" />
            <path d="m15.5 7.5 3 3" />
            <path d="m18 5 3 3" />
        </svg>
    );
};

export default KeyIcon;