import type { FC } from "react";
import type { IconProps } from "../types.ts";

const UserCogIcon: FC<IconProps> = ({
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
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <circle cx="18" cy="18" r="3" />
            <path d="M18 15v1" />
            <path d="M18 20v1" />
            <path d="m15.4 16.5.9.5" />
            <path d="m19.7 19 .9.5" />
            <path d="m15.4 19.5.9-.5" />
            <path d="m19.7 17 .9-.5" />
        </svg>
    );
};

export default UserCogIcon;