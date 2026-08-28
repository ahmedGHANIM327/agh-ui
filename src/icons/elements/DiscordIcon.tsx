import type { FC } from "react";
import type { IconProps } from "../types.ts";

const DiscordIcon: FC<IconProps> = ({
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
                d="M19.54 5.36A16.5 16.5 0 0 0 15.4 4l-.5 1.02a15.1 15.1 0 0 0-5.8 0L8.6 4a16.5 16.5 0 0 0-4.14 1.36C1.84 9.43 1.13 13.4 1.48 17.31a16.6 16.6 0 0 0 5.1 2.58l1.23-1.68a10.8 10.8 0 0 1-1.94-.93l.48-.37c3.75 1.73 7.82 1.73 11.52 0l.48.37c-.63.37-1.28.68-1.94.93l1.23 1.68a16.6 16.6 0 0 0 5.1-2.58c.42-4.53-.72-8.46-3.2-11.95ZM8.86 15.48c-1.12 0-2.05-1.02-2.05-2.27s.9-2.27 2.05-2.27c1.14 0 2.07 1.02 2.05 2.27 0 1.25-.91 2.27-2.05 2.27Zm6.28 0c-1.12 0-2.05-1.02-2.05-2.27s.9-2.27 2.05-2.27c1.14 0 2.07 1.02 2.05 2.27 0 1.25-.91 2.27-2.05 2.27Z"
            />
        </svg>
    );
};

export default DiscordIcon;

