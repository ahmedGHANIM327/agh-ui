import type { FC } from "react";
import type { IconProps } from "../types.ts";

const LinkedinIcon: FC<IconProps> = ({
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
                d="M5.2 3.5A2.2 2.2 0 1 0 5.2 7.9a2.2 2.2 0 0 0 0-4.4ZM3.4 9.3h3.6V20H3.4V9.3ZM9.2 9.3h3.4v1.46h.05c.47-.89 1.62-1.83 3.34-1.83 3.57 0 4.23 2.35 4.23 5.4V20h-3.6v-5.03c0-1.2-.02-2.75-1.68-2.75-1.68 0-1.94 1.31-1.94 2.66V20H9.2V9.3Z"
            />
        </svg>
    );
};

export default LinkedinIcon;