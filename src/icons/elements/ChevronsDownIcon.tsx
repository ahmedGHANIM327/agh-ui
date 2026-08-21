import type { FC } from "react";
import type { IconProps } from "../types.ts";
const ChevronsDownIcon: FC<IconProps> = ({ size = 18, color = "currentColor", className = "", }) => {
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
            <path d="m7 13 5 5 5-5" />
            <path d="m7 6 5 5 5-5" />
        </svg>
    );
};
export default ChevronsDownIcon;