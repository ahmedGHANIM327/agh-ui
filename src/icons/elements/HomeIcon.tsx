import type { FC } from "react";
import type { IconProps } from "../types.ts";

const HomeIcon: FC<IconProps> = ({
                                     size = 18,
                                     color = "currentColor",
                                     className = "",
                                 }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M3 11 12 2l9 9" />
            <path d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10" />
        </svg>
    );
};

export default HomeIcon;