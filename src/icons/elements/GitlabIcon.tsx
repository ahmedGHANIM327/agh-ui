import type { FC } from "react";
import type { IconProps } from "../types.ts";

const GitlabIcon: FC<IconProps> = ({
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
                d="m22.65 13.35-2.04-6.28a.75.75 0 0 0-1.42-.02l-2.08 6.34H6.89L4.81 7.05a.75.75 0 0 0-1.42.02l-2.04 6.28a2.25 2.25 0 0 0 .82 2.52l7.35 5.34a4.27 4.27 0 0 0 4.96 0l7.35-5.34a2.25 2.25 0 0 0 .82-2.52Zm-10.65 6.6L4.3 14.58a.75.75 0 0 1-.27-.84l1.64-5.05 2.02 6.15c.1.31.39.52.71.52h7.2c.32 0 .61-.21.71-.52l2.02-6.15 1.64 5.05a.75.75 0 0 1-.27.84L12 19.95Z"
            />
            <path
                fill={color}
                d="m9.73 15.36 2.27 4.59 2.27-4.59H9.73Z"
            />
        </svg>
    );
};

export default GitlabIcon;
