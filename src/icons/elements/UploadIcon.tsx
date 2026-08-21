import type { FC } from "react";
import type { IconProps } from "../types.ts";

const UploadIcon: FC<IconProps> = ({
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
            <path d="M12 15V3" />
            <path d="m7 8 5-5 5 5" />
            <path d="M5 21h14" />
        </svg>
    );
};

export default UploadIcon;