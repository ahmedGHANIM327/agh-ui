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

const GAP = 8;

// ── Singleton portal container ─────────────────────────────────────────────
// Created once at module level, never during render.
const PORTAL_ID = 'ds-tooltip-portal';

let _portal: HTMLElement | null = null;

const getPortalEl = (): HTMLElement => {
    if (_portal) return _portal;
    let el = document.getElementById(PORTAL_ID);
    if (!el) {
        el = document.createElement('div');
        el.id = PORTAL_ID;
        el.style.cssText =
            'position:fixed;inset:0;overflow:visible;pointer-events:none;z-index:9999;';
        document.body.appendChild(el);
    }
    _portal = el;
    return _portal;
};

// ── Coordinate helpers ─────────────────────────────────────────────────────
const getCoords = (
    rect: DOMRect,
    position: TooltipPosition,
): { top: number; left: number } => {
    switch (position) {
        case 'top':
            return { top: rect.top - GAP, left: rect.left + rect.width / 2 };
        case 'bottom':
            return { top: rect.bottom + GAP, left: rect.left + rect.width / 2 };
        case 'right':
            return { top: rect.top + rect.height / 2, left: rect.right + GAP };
        case 'left':
            return { top: rect.top + rect.height / 2, left: rect.left - GAP };
    }
};

// ── Component ──────────────────────────────────────────────────────────────

const Tooltip = ({
    children,
    content,
    position = 'top',
}: TooltipProps) => {
    const triggerRef = useRef<HTMLSpanElement>(null);
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });

    // Lazy initializer: runs once on first render (client-side only).
    // getPortalEl() creates the singleton div and caches it at module level.
    const [portal] = useState<HTMLElement>(() => getPortalEl());

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
                    ]
                        .filter(Boolean)
                        .join(' ')}
                    role="tooltip"
                    style={{ top: coords.top, left: coords.left }}
                >
                    {content}
                </span>,
                portal,
            )}
        </span>
    );
};

export default Tooltip;