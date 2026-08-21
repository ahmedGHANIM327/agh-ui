import type { FC } from "react";
import type { IconProps } from "../types.ts";

const UndoIcon: FC<IconProps> = ({
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
            <path d="M9 14 4 9l5-5" />
            <path d="M4 9h10a6 6 0 0 1 6 6v1" />
        </svg>
    );
};

export default UndoIcon;