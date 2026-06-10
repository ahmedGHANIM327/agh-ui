import type { ReactNode } from "react";
import styles from "./Tooltip.module.css";
const s = (cls: string): string => styles[cls] ?? '';

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
        <span className={s('tooltip')}>
            <span className={s('tooltip__trigger')}>
                {children}
            </span>

            <span
                className={[s('tooltip__content'), s(`tooltip__content--${position}`)].join(' ')}
                role="tooltip"
            >
                {content}
            </span>
        </span>
    );
};

export default Tooltip;