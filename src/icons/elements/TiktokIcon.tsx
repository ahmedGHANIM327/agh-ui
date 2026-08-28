import type { FC } from "react";
import type { IconProps } from "../types.ts";

const TiktokIcon: FC<IconProps> = ({
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
                d="M16.6 3c.27 1.6 1.2 2.9 2.72 3.73.64.35 1.32.55 2.18.59v3.07c-1.46-.03-2.75-.37-3.93-1.02v6.68c0 4.34-3.14 7.13-7.1 7.13A6.47 6.47 0 0 1 4 16.73c0-3.58 2.84-6.47 6.4-6.6.43-.02.86.02 1.27.11v3.16a3.4 3.4 0 0 0-1.26-.24c-1.77 0-3.2 1.42-3.2 3.2s1.43 3.2 3.2 3.2c1.88 0 3.23-1.22 3.23-3.57V3h2.96Z"
            />
        </svg>
    );
};

export default TiktokIcon;

