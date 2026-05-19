import type { ReactNode } from "react";
import "./Tooltip.css";

export type TooltipPosition = "top" | "bottom" | "right" | "left";

export interface TooltipProps {
    children: ReactNode;
    content: string;
    position?: TooltipPosition;
}

const Tooltip = ({
                     children,
                     content,
                     position = "top",
                 }: TooltipProps) => {
    return (
        <span className="tooltip">
            <span className="tooltip__trigger">
                {children}
            </span>

            <span
                className={`tooltip__content tooltip__content--${position}`}
                role="tooltip"
            >
                {content}
            </span>
        </span>
    );
};

export default Tooltip;