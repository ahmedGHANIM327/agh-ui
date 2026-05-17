import type { FC } from "react";
import type { IconProps } from "../types.ts";

const UserIcon: FC<IconProps> = ({
                                     size = 18,
                                     color = "currentColor",
                                     className = "",
                                 }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M20 21a8 8 0 0 0-16 0" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
};

export default UserIcon;