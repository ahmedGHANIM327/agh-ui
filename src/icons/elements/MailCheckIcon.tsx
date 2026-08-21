import type { FC } from "react";
import type { IconProps } from "../types.ts";

const MailCheckIcon: FC<IconProps> = ({
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
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            <path d="M2 7v10a2 2 0 0 0 2 2h9" />
            <path d="M22 7v5" />
            <path d="m16 19 2 2 4-4" />
            <rect width="20" height="16" x="2" y="4" rx="2" />
        </svg>
    );
};

export default MailCheckIcon;