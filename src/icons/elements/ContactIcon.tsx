import type { FC } from "react";
import type { IconProps } from "../types.ts";

const ContactIcon: FC<IconProps> = ({
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
            <path d="M16 2v2" />
            <path d="M8 2v2" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
            <circle cx="12" cy="15" r="2" />
            <path d="M8 20a4 4 0 0 1 8 0" />
        </svg>
    );
};

export default ContactIcon;