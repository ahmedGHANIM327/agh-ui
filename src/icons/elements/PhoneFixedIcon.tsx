import type { FC } from "react";
import type { IconProps } from "../types.ts";

const PhoneFixedIcon: FC<IconProps> = ({
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
            {/* Combiné */}
            <path d="M4 8h3a2 2 0 0 0 2-2V4a1 1 0 0 0-1-1H5a2 2 0 0 0-2 2v1c0 1.1.9 2 2 2z" />
            <path d="M20 8h-3a2 2 0 0 1-2-2V4a1 1 0 0 1 1-1h3a2 2 0 0 1 2 2v1c0 1.1-.9 2-2 2z" />

            {/* Base du téléphone */}
            <path d="M5 8h14v10H5z" />
            <path d="M8 18v2h8v-2" />

            {/* Boutons */}
            <circle cx="9" cy="12" r="0.75" fill={color} stroke="none" />
            <circle cx="12" cy="12" r="0.75" fill={color} stroke="none" />
            <circle cx="15" cy="12" r="0.75" fill={color} stroke="none" />
            <circle cx="9" cy="15" r="0.75" fill={color} stroke="none" />
            <circle cx="12" cy="15" r="0.75" fill={color} stroke="none" />
            <circle cx="15" cy="15" r="0.75" fill={color} stroke="none" />
        </svg>
    );
};

export default PhoneFixedIcon;
