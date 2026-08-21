import type { FC } from "react";
import type { IconProps } from "../types.ts";

const UserPlusIcon: FC<IconProps> = ({
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
            <path d="M15 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8" cy="7" r="4" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="22" y1="11" x2="16" y2="11" />
        </svg>
    );
};

export default UserPlusIcon;