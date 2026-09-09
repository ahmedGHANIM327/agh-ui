import type { FC } from "react";
import type { IconProps } from "../types.ts";

const BoldIcon: FC<IconProps> = ({
    size = 18,
    color = "currentColor",
    className = "",
}) => (
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
        <path d="M6 12h9a4 4 0 0 1 0 8H6z" />
        <path d="M6 4h8a4 4 0 0 1 0 8H6z" />
    </svg>
);

export default BoldIcon;
