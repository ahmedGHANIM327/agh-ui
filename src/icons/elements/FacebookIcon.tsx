import type { FC } from "react";
import type { IconProps } from "../types.ts";

const FacebookIcon: FC<IconProps> = ({
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
            className={className}
        >
            <path
                fill={color}
                d="M13.5 21v-8h2.75l.5-3h-3.25V8.05c0-.87.43-1.55 1.65-1.55H17V3.14C16.68 3.1 15.78 3 14.72 3c-2.22 0-3.72 1.36-3.72 3.84V10H8.5v3H11v8h2.5Z"
            />
        </svg>
    );
};

export default FacebookIcon;

