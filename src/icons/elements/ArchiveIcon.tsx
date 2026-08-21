import type { FC } from "react";
import type { IconProps } from "../types.ts";

const ArchiveIcon: FC<IconProps> = ({
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
            <path d="M21 8v13H3V8" />
            <path d="M1 3h22v5H1z" />
            <path d="M10 12h4" />
        </svg>
    );
};

export default ArchiveIcon;