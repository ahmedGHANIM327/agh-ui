import type { FC } from "react";
import type { IconProps } from "../types.ts";

const RedditIcon: FC<IconProps> = ({
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
                d="M21.75 12c0-1.52-1.23-2.75-2.75-2.75-.75 0-1.43.3-1.93.79-1.43-.94-3.17-1.52-5.07-1.61l.87-4.1 2.85.6a2 2 0 1 0 .17-1.05l-3.15-.66a.54.54 0 0 0-.64.42l-1.02 4.79c-1.96.06-3.75.64-5.22 1.6A2.74 2.74 0 0 0 4.99 9.25a2.75 2.75 0 1 0-.87 4.99c.07 2.91 3.54 5.26 7.81 5.26s7.74-2.35 7.81-5.26A2.75 2.75 0 0 0 21.75 12Zm-14.5-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Zm9.06 5.1c-.93.93-2.72 1.4-4.31 1.4s-3.38-.47-4.31-1.4a.54.54 0 0 1 .76-.76c.58.58 1.82 1.08 3.55 1.08s2.97-.5 3.55-1.08a.54.54 0 1 1 .76.76Zm-.57-2.6a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z"
            />
        </svg>
    );
};

export default RedditIcon;
