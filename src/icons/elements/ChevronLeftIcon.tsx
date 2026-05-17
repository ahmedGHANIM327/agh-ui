import type { FC } from "react";
import type { IconProps } from "../types.ts";

const ChevronLeftIcon: FC<IconProps> = ({
                                            size = 18,
                                            color = "currentColor",
                                            className = "",
                                        }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="m15 18-6-6 6-6" />
        </svg>
    );
};

export default ChevronLeftIcon;