import { type FC, type ReactElement } from "react";
import Icon from "../icon/Icon.tsx";
import styles from "./Pagination.module.css";

const s = (cls: string): string => styles[cls] ?? "";

export interface PaginationProps {
    /** Current active page (1-based) */
    page: number;
    /** Total number of pages */
    nbPages: number;
    /** Callback when a page changes */
    onPageChange: (page: number) => void;
    /** Maximum number of page buttons to show at once (default: 3) */
    maxToShow?: number;
    /** Additional class name */
    className?: string;
}

// ── helpers ────────────────────────────────────────────────────────────────

const buildPages = (
    pages: number,
    currentPage: number,
    maxToShow: number,
    onPageChange: (p: number) => void
): ReactElement[] => {
    const btn = (i: number): ReactElement => (
        <button
            key={i}
            onClick={() => onPageChange(i)}
            aria-current={currentPage === i ? "page" : undefined}
            className={[s("pagination__page"), currentPage === i ? s("pagination__page--active") : ""].filter(Boolean).join(" ")}
        >
            {i}
        </button>
    );

    const ellipsis = (key: string): ReactElement => (
        <span key={key} className={s("pagination__ellipsis")}>
            &hellip;
        </span>
    );

    const els: ReactElement[] = [];

    if (pages <= maxToShow) {
        for (let i = 1; i <= pages; i++) els.push(btn(i));
        return els;
    }

    if (currentPage === 1) {
        for (let i = 1; i <= Math.min(pages, maxToShow); i++) els.push(btn(i));
        if (pages > maxToShow) els.push(ellipsis("end"));
    } else if (currentPage === pages) {
        for (let i = pages - maxToShow + 1; i <= pages; i++) els.push(btn(i));
        els.unshift(ellipsis("start"));
    } else {
        for (
            let i = currentPage - 1;
            i <= Math.min(currentPage + maxToShow - 2, pages);
            i++
        ) {
            els.push(btn(i));
        }
        if (currentPage > 2) els.unshift(ellipsis("start"));
        if (currentPage <= pages - 1 && currentPage + (maxToShow - 2) < pages)
            els.push(ellipsis("end"));
    }

    return els;
};

// ── component ──────────────────────────────────────────────────────────────

const Pagination: FC<PaginationProps> = ({
    page,
    nbPages,
    onPageChange,
    maxToShow = 3,
    className = "",
}) => {
    const handleFirst = () => onPageChange(1);
    const handlePrevious = () => { if (page > 1) onPageChange(page - 1); };
    const handleNext = () => { if (page < nbPages) onPageChange(page + 1); };
    const handleLast = () => onPageChange(nbPages);

    return (
        <nav
            aria-label="Pagination"
            className={[s("pagination"), className].filter(Boolean).join(" ")}
        >
            <button
                onClick={handleFirst}
                disabled={page <= 1}
                aria-label="First page"
                className={[s("pagination__nav"), s("pagination__nav--first")].join(" ")}
            >
                <Icon name="chevronsLeft" size={16} />
            </button>

            <button
                onClick={handlePrevious}
                disabled={page <= 1}
                aria-label="Previous page"
                className={[s("pagination__nav"), s("pagination__nav--prev")].join(" ")}
            >
                <Icon name="chevronLeft" size={16} />
            </button>

            <div className={s("pagination__pages")}>
                {buildPages(nbPages, page, maxToShow, onPageChange)}
            </div>

            <button
                onClick={handleNext}
                disabled={page >= nbPages}
                aria-label="Next page"
                className={[s("pagination__nav"), s("pagination__nav--next")].join(" ")}
            >
                <Icon name="chevronRight" size={16} />
            </button>

            <button
                onClick={handleLast}
                disabled={page >= nbPages}
                aria-label="Last page"
                className={[s("pagination__nav"), s("pagination__nav--last")].join(" ")}
            >
                <Icon name="chevronsRight" size={16} />
            </button>
        </nav>
    );
};

export default Pagination;
