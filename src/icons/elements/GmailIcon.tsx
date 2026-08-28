import type { FC } from "react";
import type { IconProps } from "../types.ts";

const GmailIcon: FC<IconProps> = ({
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
                d="M3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-13Z"
                stroke={color}
                strokeWidth={1.8}
            />
            <path
                d="M5 6.5 12 12l7-5.5"
                stroke={color}
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5 18V6.5M19 18V6.5"
                stroke={color}
                strokeWidth={1.8}
                strokeLinecap="round"
            />
        </svg>
    );
};

export default GmailIcon;

