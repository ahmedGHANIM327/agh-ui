import type { FC } from "react";
import type { IconProps } from "../types.ts";

const SearchIcon: FC<IconProps> = ({
                                       size = 18,
                                       color = "currentColor",
                                       className = "",
                                   }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
        </svg>
    );
};

export default SearchIcon;