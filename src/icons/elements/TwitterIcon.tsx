import type { FC } from "react";
import type { IconProps } from "../types.ts";

const TwitterIcon: FC<IconProps> = ({
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
                d="M18.9 2.5h3.68l-8.04 9.19L24 21.5h-7.41l-5.8-7.58-6.63 7.58H.48l8.6-9.83L0 2.5h7.6l5.24 6.93L18.9 2.5Zm-1.29 17h2.04L6.49 4.4H4.3l13.31 15.1Z"
            />
        </svg>
    );
};

export default TwitterIcon;