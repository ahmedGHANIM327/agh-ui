import { type ReactNode, useMemo, useRef, useEffect, useState } from "react";
import styles from "./Table.module.css";
import Icon from "../icon/Icon.tsx";

const s = (cls: string): string => styles[cls] ?? "";

// ── Types ──────────────────────────────────────────────────────────────────

export interface ColumnDef<T> {
    /** Unique identifier for the column */
    id: string;
    /** Column header content */
    header?: ReactNode;
    /** Extra CSS class applied to every cell of this column */
    className?: string;
    /** Direct key on the row data object used as cell value */
    accessorKey?: keyof T;
    /** Custom cell renderer */
    cell?: (row: T) => ReactNode;
    /** Allow clicking the header to sort by this column */
    enableSorting?: boolean;
    /** Whether this column can be hidden via columnVisibility */
    enableHiding?: boolean;
    /** Display order – columns without an order keep their list position */
    order?: number;
    /** Stick this column to the right edge */
    sticky?: boolean;
}

export interface SortingState {
    columnId: string;
    direction: "asc" | "desc";
}

export interface TableProps<T> {
    columns: ColumnDef<T>[];
    data: T[];
    /** Show a loading overlay */
    isLoading?: boolean;
    /** Message shown when data is empty */
    noDataMessage?: string;
    /** Extra CSS class for the outer container */
    className?: string;
    /** Active sort state */
    sorting?: SortingState;
    /** Called when user clicks a sortable column header */
    setSorting?: (sorting: SortingState | undefined) => void;
    /** Map of columnId → visible */
    columnVisibility?: Record<string, boolean>;
    setColumnVisibility?: (visibility: Record<string, boolean>) => void;
    /** Currently selected row IDs */
    selectedRowIds?: string[];
    /** Called when selection changes – presence enables the selection column */
    setSelectedRowIds?: (ids: string[]) => void;
    /** Defaults to "multiple" when setSelectedRowIds is provided */
    selectionMode?: "single" | "multiple";
    /** Function to derive a unique string ID from a row (defaults to row index) */
    getRowId?: (row: T, index: number) => string;
}

// ── Indeterminate checkbox ─────────────────────────────────────────────────

interface IndeterminateCheckboxProps {
    checked: boolean;
    indeterminate?: boolean;
    onChange: () => void;
    className?: string;
}

function IndeterminateCheckbox({ checked, indeterminate = false, onChange, className }: IndeterminateCheckboxProps) {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.indeterminate = indeterminate;
        }
    }, [indeterminate]);

    return (
        <input
            ref={ref}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className={[s("table__checkbox"), className ?? ""].filter(Boolean).join(" ")}
        />
    );
}

// ── Table component ────────────────────────────────────────────────────────

function Table<T>({
    columns,
    data,
    isLoading = false,
    noDataMessage = "No data",
    className = "",
    sorting,
    setSorting,
    columnVisibility,
    selectedRowIds = [],
    setSelectedRowIds,
    selectionMode,
    getRowId,
}: TableProps<T>) {
    const hasSelection = !!setSelectedRowIds;
    const resolvedSelectionMode: "single" | "multiple" = selectionMode ?? (hasSelection ? "multiple" : "multiple");

    // ── Scroll shadow detection ────────────────────────────────────────────
    const containerRef = useRef<HTMLDivElement>(null);
    const [isScrolledStart, setIsScrolledStart] = useState(false);
    const [isScrolledEnd, setIsScrolledEnd] = useState(false);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const update = () => {
            const { scrollLeft, scrollWidth, clientWidth } = el;
            setIsScrolledStart(scrollLeft > 1);
            setIsScrolledEnd(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
        };

        update();
        el.addEventListener("scroll", update, { passive: true });
        const ro = new ResizeObserver(update);
        ro.observe(el);

        return () => {
            el.removeEventListener("scroll", update);
            ro.disconnect();
        };
    }, []);

    // ── Visible + ordered columns ──────────────────────────────────────────
    const visibleColumns = useMemo<ColumnDef<T>[]>(() => {
        const sorted = [...columns].sort((a, b) => {
            const oa = a.order ?? Number.MAX_SAFE_INTEGER;
            const ob = b.order ?? Number.MAX_SAFE_INTEGER;
            return oa - ob;
        });
        if (!columnVisibility) return sorted;
        return sorted.filter((col) => columnVisibility[col.id] !== false);
    }, [columns, columnVisibility]);

    const hasStickyRight = useMemo(() => visibleColumns.some((c) => c.sticky), [visibleColumns]);
    const showLeftShadow = hasSelection && isScrolledStart;
    const showRightShadow = hasStickyRight && isScrolledEnd;

    // ── Row ID helper ──────────────────────────────────────────────────────
    const resolveRowId = (row: T, index: number): string =>
        getRowId ? getRowId(row, index) : String(index);

    // ── Selection state ────────────────────────────────────────────────────
    const allIds = data.map(resolveRowId);
    const isAllSelected = hasSelection && data.length > 0 && allIds.every((id) => selectedRowIds.includes(id));
    const isSomeSelected =
        hasSelection && selectedRowIds.length > 0 && !isAllSelected;

    const handleSelectAll = () => {
        if (!setSelectedRowIds) return;
        if (isAllSelected) {
            setSelectedRowIds([]);
        } else {
            setSelectedRowIds(allIds);
        }
    };

    const handleDeselectAll = () => setSelectedRowIds?.([]);

    const handleSelectRow = (rowId: string) => {
        if (!setSelectedRowIds) return;
        if (resolvedSelectionMode === "single") {
            setSelectedRowIds(selectedRowIds.includes(rowId) ? [] : [rowId]);
        } else {
            if (selectedRowIds.includes(rowId)) {
                setSelectedRowIds(selectedRowIds.filter((id) => id !== rowId));
            } else {
                setSelectedRowIds([...selectedRowIds, rowId]);
            }
        }
    };

    // ── Sorting ────────────────────────────────────────────────────────────
    const handleSort = (colId: string) => {
        if (!setSorting) return;
        if (sorting?.columnId === colId) {
            if (sorting.direction === "asc") {
                setSorting({ columnId: colId, direction: "desc" });
            } else {
                setSorting(undefined);
            }
        } else {
            setSorting({ columnId: colId, direction: "asc" });
        }
    };

    const getSortIcon = (colId: string): ReactNode => {
        const isActive = sorting?.columnId === colId;
        if (!isActive) {
            return (
                <Icon
                    name="chevronsUpDown"
                    size={13}
                    className={s("table__sort-icon")}
                />
            );
        }
        return (
            <Icon
                name={sorting!.direction === "asc" ? "chevronUp" : "chevronDown"}
                size={13}
                className={[s("table__sort-icon"), s("table__sort-icon--active")].join(" ")}
            />
        );
    };

    // ── Cell value ─────────────────────────────────────────────────────────
    const getCellValue = (row: T, col: ColumnDef<T>): ReactNode => {
        if (col.cell) return col.cell(row);
        if (col.accessorKey !== undefined) {
            const val = (row as Record<string | symbol, unknown>)[col.accessorKey as string | symbol];
            return val !== null && val !== undefined ? String(val) : "";
        }
        return "";
    };

    const colSpan = visibleColumns.length + (hasSelection ? 1 : 0);

    // ── Render ─────────────────────────────────────────────────────────────
    return (
        <div className={[s("table__wrapper"), className].filter(Boolean).join(" ")}>
            {showLeftShadow && <div className={s("table__shadow-left")} aria-hidden="true" />}
            {showRightShadow && <div className={s("table__shadow-right")} aria-hidden="true" />}
            <div ref={containerRef} className={s("table__container")}>

                <table className={s("table")}>
                    {/* ── THEAD ─────────────────────────────────────────── */}
                    <thead className={s("table__thead")}>
                        <tr>
                            {hasSelection && (
                                <th className={[s("table__th"), s("table__th--selection")].join(" ")}>
                                    {resolvedSelectionMode === "multiple" ? (
                                        <IndeterminateCheckbox
                                            checked={isAllSelected}
                                            indeterminate={isSomeSelected}
                                            onChange={handleSelectAll}
                                        />
                                    ) : (
                                        selectedRowIds.length > 0 && (
                                            <button
                                                className={s("table__deselect-btn")}
                                                onClick={handleDeselectAll}
                                                aria-label="Deselect"
                                            >
                                                <Icon name="x" size={14} />
                                            </button>
                                        )
                                    )}
                                </th>
                            )}

                            {visibleColumns.map((col) => (
                                <th
                                    key={col.id}
                                    className={[
                                        s("table__th"),
                                        col.enableSorting && setSorting ? s("table__th--sortable") : "",
                                        col.sticky ? s("table__th--sticky") : "",
                                        col.className ?? "",
                                    ]
                                        .filter(Boolean)
                                        .join(" ")}
                                    onClick={
                                        col.enableSorting && setSorting
                                            ? () => handleSort(col.id)
                                            : undefined
                                    }
                                >
                                    <div className={s("table__th-content")}>
                                        {col.header}
                                        {col.enableSorting && setSorting && getSortIcon(col.id)}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* ── TBODY ─────────────────────────────────────────── */}
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={colSpan} className={s("table__loading-cell")}>
                                    <Icon name="spinner" size={28} />
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={colSpan} className={s("table__empty")}>
                                    {noDataMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((row, rowIndex) => {
                                const rowId = resolveRowId(row, rowIndex);
                                const isSelected = selectedRowIds.includes(rowId);

                                return (
                                    <tr
                                        key={rowId}
                                        className={[
                                            s("table__tr"),
                                            isSelected ? s("table__tr--selected") : "",
                                        ]
                                            .filter(Boolean)
                                            .join(" ")}
                                    >
                                        {hasSelection && (
                                            <td
                                                className={[
                                                    s("table__td--selection"),
                                                ].join(" ")}
                                            >
                                                {resolvedSelectionMode === "multiple" ? (
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => handleSelectRow(rowId)}
                                                        className={s("table__checkbox")}
                                                    />
                                                ) : (
                                                    <input
                                                        type="radio"
                                                        checked={isSelected}
                                                        onChange={() => handleSelectRow(rowId)}
                                                        className={s("table__radio")}
                                                    />
                                                )}
                                            </td>
                                        )}

                                        {visibleColumns.map((col) => (
                                            <td
                                                key={col.id}
                                                className={[
                                                    s("table__td"),
                                                    col.sticky ? s("table__td--sticky") : "",
                                                    col.className ?? "",
                                                ]
                                                    .filter(Boolean)
                                                    .join(" ")}
                                            >
                                                {getCellValue(row, col)}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

Table.displayName = "Table";

export default Table;
