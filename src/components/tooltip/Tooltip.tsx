import { type ReactNode, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import styles from "./Tooltip.module.css";

const s = (cls: string): string => styles[cls] ?? '';

export type TooltipPosition = "top" | "bottom" | "right" | "left";

export interface TooltipProps {
    children: ReactNode;
    content: string;
    position?: TooltipPosition;
}

const GAP = 8; // px between trigger and tooltip

const getCoords = (rect: DOMRect, position: TooltipPosition): { top: number; left: number } => {
    switch (position) {
        case "top":
            return { top: rect.top - GAP, left: rect.left + rect.width / 2 };
        case "bottom":
            return { top: rect.bottom + GAP, left: rect.left + rect.width / 2 };
        case "right":
            return { top: rect.top + rect.height / 2, left: rect.right + GAP };
        case "left":
            return { top: rect.top + rect.height / 2, left: rect.left - GAP };
    }
};

const Tooltip = ({
    children,
    content,
    position = "top",
}: TooltipProps) => {
    const triggerRef = useRef<HTMLSpanElement>(null);
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });

    const show = useCallback(() => {
        if (!triggerRef.current) return;
        const rect = triggerRef.current.getBoundingClientRect();
        setCoords(getCoords(rect, position));
        setVisible(true);
    }, [position]);

    const hide = useCallback(() => setVisible(false), []);

    return (
        <span
            ref={triggerRef}
            className={s('tooltip__trigger')}
            onMouseEnter={show}
            onMouseLeave={hide}
            onFocus={show}
            onBlur={hide}
        >
            {children}

            {createPortal(
                <span
                    className={[
                        s('tooltip__content'),
                        s(`tooltip__content--${position}`),
                        visible ? s('tooltip__content--visible') : '',
                    ].filter(Boolean).join(' ')}
                    role="tooltip"
                    style={{ top: coords.top, left: coords.left }}
                >
                    {content}
                </span>,
                document.body,
            )}
        </span>
    );
};

export default Tooltip;