import {
    type CSSProperties,
    type FC,
    type ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import Button from "../button/Button";
import styles from "./Sidebar.module.css";
import { SidebarContext, useSidebar } from "./useSidebar";

const s = (cls: string): string => styles[cls] ?? '';

const MOBILE_QUERY = "(max-width: 767px)";

const isMobileViewport = (): boolean =>
    typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches;

// ── Provider ───────────────────────────────────────────────────────────────

export interface SidebarProviderProps {
    children: ReactNode;
    /** Initial state when uncontrolled (default: open on desktop, closed on mobile) */
    defaultOpen?: boolean;
    /** Controlled state */
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    className?: string;
}

export const SidebarProvider: FC<SidebarProviderProps> = ({
    children,
    defaultOpen,
    isOpen,
    onOpenChange,
    className = "",
}) => {
    const [internalOpen, setInternalOpen] = useState(() => defaultOpen ?? !isMobileViewport());
    const open = isOpen ?? internalOpen;

    const setOpen = useCallback(
        (value: boolean) => {
            if (isOpen === undefined) setInternalOpen(value);
            onOpenChange?.(value);
        },
        [isOpen, onOpenChange],
    );

    const toggle = useCallback(() => setOpen(!open), [open, setOpen]);

    const value = useMemo(() => ({ isOpen: open, setOpen, toggle }), [open, setOpen, toggle]);

    return (
        <SidebarContext.Provider value={value}>
            <div className={[s('sidebar-layout'), className].filter(Boolean).join(' ')}>
                {children}
            </div>
        </SidebarContext.Provider>
    );
};

// ── Sidebar ────────────────────────────────────────────────────────────────

export interface SidebarProps {
    children?: ReactNode;
    header?: ReactNode;
    footer?: ReactNode;
    /** Sidebar width (default 300px) */
    width?: number | string;
    /** Background color (default: muted) */
    background?: string;
    className?: string;
}

export const Sidebar: FC<SidebarProps> = ({
    children,
    header,
    footer,
    width = 300,
    background,
    className = "",
}) => {
    const { isOpen, setOpen } = useSidebar();
    const asideRef = useRef<HTMLElement>(null);
    const [isWide, setIsWide] = useState(false);

    // On mobile, when the drawer takes 80%+ of the screen, a close button is shown
    useEffect(() => {
        const measure = () => {
            if (!asideRef.current) return;
            setIsWide(isMobileViewport() && asideRef.current.offsetWidth >= window.innerWidth * 0.8);
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [width]);

    // On mobile the sidebar is a drawer: Escape closes it
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isMobileViewport()) setOpen(false);
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, setOpen]);

    const w = typeof width === "number" ? `${width}px` : width;

    const style = {
        "--sidebar-width": w,
        ...(background ? { "--sidebar-bg": background } : {}),
    } as CSSProperties;

    return (
        <>
        <div
            className={[s('sidebar__backdrop'), isOpen ? s('sidebar__backdrop--visible') : ''].filter(Boolean).join(' ')}
            aria-hidden="true"
            onClick={() => setOpen(false)}
        />
        <aside
            ref={asideRef}
            className={[s('sidebar'), isOpen ? s('sidebar--open') : '', isWide ? s('sidebar--wide') : '', className].filter(Boolean).join(' ')}
            style={style}
            aria-hidden={!isOpen}
            inert={!isOpen}
        >
            {isWide && (
                <Button
                    size="icon"
                    variant="ghost"
                    iconName="x"
                    aria-label="Close sidebar"
                    onClick={() => setOpen(false)}
                    className={s('sidebar__close')}
                />
            )}
            <div className={s('sidebar__inner')}>
                {header && <div className={s('sidebar__header')}>{header}</div>}
                <div className={s('sidebar__content')}>{children}</div>
                {footer && <div className={s('sidebar__footer')}>{footer}</div>}
            </div>
        </aside>
        </>
    );
};

// ── Inset (app content next to the sidebar) ────────────────────────────────

export interface SidebarInsetProps {
    children: ReactNode;
    className?: string;
}

export const SidebarInset: FC<SidebarInsetProps> = ({ children, className = "" }) => (
    <main className={[s('sidebar-inset'), className].filter(Boolean).join(' ')}>{children}</main>
);

export default Sidebar;
