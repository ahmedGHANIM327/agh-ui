import {
    type KeyboardEvent,
    type ReactNode,
    useCallback,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from "react";
import { createPortal } from "react-dom";
import Icon from "../icon/Icon";
import styles from "./Combobox.module.css";

const s = (cls: string): string => styles[cls] ?? "";

export interface ComboboxProps<T> {
    /** List of options of any shape. */
    options: T[];

    /** Extract the string value from an option (used for value / onValueChange). */
    getOptionValue: (option: T) => string;

    /**
     * Render the option row inside the dropdown list.
     * Can return any ReactNode (e.g. Badge, Avatar + text, ...).
     */
    renderOption: (option: T) => ReactNode;

    /**
     * Render the selected value inside the trigger.
     * Defaults to `renderOption` if not provided.
     */
    renderValue?: (option: T) => ReactNode;

    /**
     * Keys of the option object where the search should look.
     * Example: `["firstName", "lastName"]` will match on both fields.
     *
     * - If options are plain strings, this prop is ignored and the search
     *   runs directly on each string.
     * - If options are objects and `searchKeys` is omitted, the search
     *   falls back to `getOptionValue`.
     */
    searchKeys?: (keyof T & string)[];

    /**
     * Enable multi-select. When true:
     *  - `value` / `defaultValue` are `string[]`
     *  - `onValueChange` receives `(values, options)`
     *  - the dropdown stays open on selection (each click toggles the option)
     */
    multiple?: boolean;

    /**
     * When `multiple` is true, maximum number of value badges shown in the
     * trigger. Extra selections are collapsed into a `+N` overflow badge.
     * Defaults to `2`.
     */
    maxVisibleBadges?: number;

    value?: string | string[];
    defaultValue?: string | string[];

    onValueChange?: (
        value: string | string[],
        option: T | T[],
    ) => void;

    placeholder?: string;

    label?: string;
    description?: string;
    error?: string;

    disabled?: boolean;
    required?: boolean;

    searchable?: boolean;

    id?: string;
    name?: string;
    className?: string;
    containerClassName?: string;
    labelClassName?: string;
    descriptionClassName?: string;
    errorClassName?: string;
}

// ── Singleton portal container ─────────────────────────────────────────────
const PORTAL_ID = "ds-combobox-portal";
let _portal: HTMLElement | null = null;

const getPortalEl = (): HTMLElement => {
    if (_portal) return _portal;
    let el = document.getElementById(PORTAL_ID);
    if (!el) {
        el = document.createElement("div");
        el.id = PORTAL_ID;
        el.style.cssText =
            "position:fixed;inset:0;overflow:visible;pointer-events:none;z-index:9999;";
        document.body.appendChild(el);
    }
    _portal = el;
    return _portal;
};

const Combobox = <T,>({
    options,
    getOptionValue,
    renderOption,
    renderValue,
    searchKeys,
    multiple = false,
    maxVisibleBadges = 2,
    value,
    defaultValue,
    onValueChange,
    placeholder = "Select...",
    label,
    description,
    error,
    disabled = false,
    required = false,
    searchable = false,
    id,
    name,
    className = "",
    containerClassName = "",
    labelClassName = "",
    descriptionClassName = "",
    errorClassName = "",
}: ComboboxProps<T>) => {
    const isControlled = value !== undefined;

    // Normalize to array internally.
    const toArray = (v: string | string[] | undefined): string[] => {
        if (v === undefined) return [];
        return Array.isArray(v) ? v : [v];
    };

    const [internalValues, setInternalValues] = useState<string[]>(() =>
        toArray(defaultValue),
    );
    const currentValues: string[] = isControlled
        ? toArray(value)
        : internalValues;

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const [coords, setCoords] = useState<{
        top: number;
        left: number;
        width: number;
    }>({ top: 0, left: 0, width: 0 });

    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const reactId = useId();
    const baseId = id ?? `combobox-${reactId}`;
    const listboxId = `${baseId}-listbox`;
    const optionId = (i: number) => `${baseId}-option-${i}`;

    const [portal] = useState<HTMLElement>(() => getPortalEl());

    // Set of currently selected values for O(1) lookup.
    const selectedSet = useMemo(
        () => new Set(currentValues),
        [currentValues],
    );

    // Currently selected options (may be empty).
    const selectedOptions = useMemo(
        () => options.filter((o) => selectedSet.has(getOptionValue(o))),
        [options, selectedSet, getOptionValue],
    );

    // Filtered options based on the search query.
    const filtered = useMemo(() => {
        if (!searchable || !query.trim()) return options;
        const q = query.toLowerCase();

        return options.filter((o) => {
            // Case 1 — options are plain strings: search directly.
            if (typeof o === "string") {
                return o.toLowerCase().includes(q);
            }
            // Case 2 — options are objects with explicit searchKeys.
            if (searchKeys && searchKeys.length > 0) {
                return searchKeys.some((key) => {
                    const v = (o as Record<string, unknown>)[key as string];
                    return typeof v === "string"
                        ? v.toLowerCase().includes(q)
                        : typeof v === "number"
                          ? String(v).toLowerCase().includes(q)
                          : false;
                });
            }
            // Case 3 — fallback: search on the option's value.
            return getOptionValue(o).toLowerCase().includes(q);
        });
    }, [options, query, searchable, searchKeys, getOptionValue]);

    // (selection lookups per-row are done inline via selectedSet)

    // Position dropdown under trigger
    const updateCoords = useCallback(() => {
        if (!triggerRef.current) return;
        const rect = triggerRef.current.getBoundingClientRect();
        setCoords({
            top: rect.bottom + 4,
            left: rect.left,
            width: rect.width,
        });
    }, []);

    useEffect(() => {
        if (!open) return;
        updateCoords();

        const onScrollOrResize = () => updateCoords();
        window.addEventListener("scroll", onScrollOrResize, true);
        window.addEventListener("resize", onScrollOrResize);
        return () => {
            window.removeEventListener("scroll", onScrollOrResize, true);
            window.removeEventListener("resize", onScrollOrResize);
        };
    }, [open, updateCoords]);

    // Centralized open/close handler.
    const setOpenState = useCallback(
        (next: boolean) => {
            setOpen(next);
            if (next) {
                // At open time, query is still empty → source == options.
                // Initial active row: first selected option (if any),
                // otherwise the first option.
                const firstSelected =
                    currentValues.length > 0
                        ? options.findIndex((o) =>
                              selectedSet.has(getOptionValue(o)),
                          )
                        : -1;
                setActiveIndex(
                    firstSelected >= 0
                        ? firstSelected
                        : options.length
                          ? 0
                          : -1,
                );
                if (searchable) {
                    requestAnimationFrame(() =>
                        searchInputRef.current?.focus(),
                    );
                }
            } else {
                setQuery("");
                setActiveIndex(-1);
            }
        },
        [searchable, options, currentValues, selectedSet, getOptionValue],
    );

    // Click outside → close
    useEffect(() => {
        if (!open) return;
        const onDocMouseDown = (e: MouseEvent) => {
            const target = e.target as Node;
            if (
                triggerRef.current?.contains(target) ||
                dropdownRef.current?.contains(target)
            ) {
                return;
            }
            setOpenState(false);
        };
        document.addEventListener("mousedown", onDocMouseDown);
        return () => document.removeEventListener("mousedown", onDocMouseDown);
    }, [open, setOpenState]);

    // Keep activeIndex in bounds when filtered changes (e.g. while typing).
    const safeActiveIndex =
        activeIndex >= filtered.length
            ? filtered.length
                ? 0
                : -1
            : activeIndex;

    // Scroll active option into view
    useEffect(() => {
        if (!open || safeActiveIndex < 0 || !listRef.current) return;
        const el = listRef.current.querySelector<HTMLLIElement>(
            `#${CSS.escape(optionId(safeActiveIndex))}`,
        );
        el?.scrollIntoView({ block: "nearest" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [safeActiveIndex, open]);

    const commitOption = (opt: T) => {
        const v = getOptionValue(opt);

        if (multiple) {
            // Toggle in the current selection; keep dropdown open.
            const isSelected = selectedSet.has(v);
            const nextValues = isSelected
                ? currentValues.filter((x) => x !== v)
                : [...currentValues, v];
            const nextOptions = options.filter((o) =>
                nextValues.includes(getOptionValue(o)),
            );
            if (!isControlled) setInternalValues(nextValues);
            onValueChange?.(nextValues, nextOptions);
            // Refocus search input (if present) so keyboard flow keeps going.
            if (searchable) {
                requestAnimationFrame(() => searchInputRef.current?.focus());
            }
            return;
        }

        // Single-select: replace and close.
        if (!isControlled) setInternalValues([v]);
        onValueChange?.(v, opt);
        setOpenState(false);
        requestAnimationFrame(() => triggerRef.current?.focus());
    };

    const openDropdown = () => {
        if (disabled) return;
        setOpenState(true);
    };

    const handleTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
        if (disabled) return;
        switch (e.key) {
            case "ArrowDown":
            case "ArrowUp":
            case "Enter":
            case " ":
                e.preventDefault();
                openDropdown();
                break;
        }
    };

    const handleListKeyDown = (
        e: KeyboardEvent<HTMLUListElement | HTMLInputElement>,
    ) => {
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setActiveIndex(
                    filtered.length
                        ? (safeActiveIndex + 1) % filtered.length
                        : -1,
                );
                break;
            case "ArrowUp":
                e.preventDefault();
                setActiveIndex(
                    filtered.length
                        ? (safeActiveIndex - 1 + filtered.length) %
                              filtered.length
                        : -1,
                );
                break;
            case "Home":
                e.preventDefault();
                setActiveIndex(filtered.length ? 0 : -1);
                break;
            case "End":
                e.preventDefault();
                setActiveIndex(filtered.length ? filtered.length - 1 : -1);
                break;
            case "Enter":
                e.preventDefault();
                if (safeActiveIndex >= 0 && safeActiveIndex < filtered.length) {
                    commitOption(filtered[safeActiveIndex]);
                }
                break;
            case "Escape":
                e.preventDefault();
                setOpenState(false);
                requestAnimationFrame(() => triggerRef.current?.focus());
                break;
        }
    };

    const renderTriggerValue = (): ReactNode => {
        if (selectedOptions.length === 0) return placeholder;
        const render = renderValue ?? renderOption;
        if (!multiple) return render(selectedOptions[0]);

        // Multi: show at most `maxVisibleBadges` badges + a "+N" overflow badge.
        const max = Math.max(0, maxVisibleBadges);
        const visible = selectedOptions.slice(0, max);
        const overflow = selectedOptions.length - visible.length;

        return (
            <span className={s("combobox__value-list")}>
                {visible.map((opt) => (
                    <span
                        key={getOptionValue(opt)}
                        className={s("combobox__value-badge")}
                    >
                        {render(opt)}
                    </span>
                ))}
                {overflow > 0 && (
                    <span
                        className={[
                            s("combobox__value-badge"),
                            s("combobox__value-badge--more"),
                        ].join(" ")}
                        aria-label={`${overflow} more selected`}
                        title={selectedOptions
                            .slice(max)
                            .map((o) => getOptionValue(o))
                            .join(", ")}
                    >
                        +{overflow}
                    </span>
                )}
            </span>
        );
    };

    const hasSelection = selectedOptions.length > 0;

    const descriptionId = description ? `${baseId}-description` : undefined;
    const errorId = error ? `${baseId}-error` : undefined;
    const describedBy = errorId ?? descriptionId;

    return (
        <div
            className={[s("combobox__container"), containerClassName]
                .filter(Boolean)
                .join(" ")}
        >
            {label && (
                <label
                    htmlFor={baseId}
                    className={[
                        s("combobox__label"),
                        error ? s("combobox__label--error") : "",
                        labelClassName,
                    ]
                        .filter(Boolean)
                        .join(" ")}
                >
                    {label}
                    {required && (
                        <span
                            aria-hidden="true"
                            className={s("combobox__required")}
                        >
                            {" *"}
                        </span>
                    )}
                </label>
            )}

            <div
                className={[s("combobox"), className]
                    .filter(Boolean)
                    .join(" ")}
            >
                <button
                    ref={triggerRef}
                    type="button"
                    id={baseId}
                    name={name}
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    aria-controls={listboxId}
                    aria-activedescendant={
                        open && safeActiveIndex >= 0
                            ? optionId(safeActiveIndex)
                            : undefined
                    }
                    aria-required={required || undefined}
                    aria-disabled={disabled || undefined}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={describedBy}
                    disabled={disabled}
                    className={[
                        s("combobox__trigger"),
                        disabled ? s("combobox__trigger--disabled") : "",
                        open ? s("combobox__trigger--open") : "",
                        error ? s("combobox__trigger--error") : "",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    onClick={() =>
                        open ? setOpenState(false) : openDropdown()
                    }
                    onKeyDown={handleTriggerKeyDown}
                >
                    <span
                        className={[
                            s("combobox__value"),
                            !hasSelection
                                ? s("combobox__value--placeholder")
                                : "",
                        ]
                            .filter(Boolean)
                            .join(" ")}
                    >
                        {renderTriggerValue()}
                    </span>
                    <span
                        aria-hidden="true"
                        className={[
                            s("combobox__icon"),
                            open ? s("combobox__icon--open") : "",
                        ]
                            .filter(Boolean)
                            .join(" ")}
                    >
                        <Icon name="chevronDown" size={16} />
                    </span>
                </button>
            </div>

            {createPortal(
                <div
                    ref={dropdownRef}
                    className={[
                        s("combobox__dropdown"),
                        open ? s("combobox__dropdown--open") : "",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    style={{
                        top: coords.top,
                        left: coords.left,
                        width: coords.width,
                    }}
                    role="presentation"
                    onMouseDown={(e) => {
                        // Prevent trigger from losing focus / dropdown from
                        // closing when interacting inside the portal.
                        e.stopPropagation();
                    }}
                >
                    {open && searchable && (
                        <div className={s("combobox__search")}>
                            <span
                                className={s("combobox__search-icon")}
                                aria-hidden="true"
                            >
                                <Icon name="search" size={14} />
                            </span>
                            <input
                                ref={searchInputRef}
                                type="text"
                                className={s("combobox__search-input")}
                                placeholder="Search..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleListKeyDown}
                                aria-controls={listboxId}
                                aria-autocomplete="list"
                            />
                            {query.length > 0 && (
                                <button
                                    type="button"
                                    className={s("combobox__search-clear")}
                                    aria-label="Clear search"
                                    onClick={() => {
                                        setQuery("");
                                        searchInputRef.current?.focus();
                                    }}
                                >
                                    <Icon name="x" size={14} />
                                </button>
                            )}
                        </div>
                    )}

                    <ul
                        ref={listRef}
                        id={listboxId}
                        role="listbox"
                        aria-multiselectable={multiple || undefined}
                        tabIndex={-1}
                        className={s("combobox__list")}
                        onKeyDown={handleListKeyDown}
                    >
                        {open && filtered.length === 0 && (
                            <li
                                role="presentation"
                                className={s("combobox__empty")}
                            >
                                No options found
                            </li>
                        )}

                        {open &&
                            filtered.map((opt, i) => {
                                const optValue = getOptionValue(opt);
                                const selected = selectedSet.has(optValue);
                                const active = i === safeActiveIndex;
                                return (
                                    <li
                                        key={optValue}
                                        id={optionId(i)}
                                        role="option"
                                        aria-selected={selected}
                                        className={[
                                            s("combobox__option"),
                                            active
                                                ? s("combobox__option--active")
                                                : "",
                                            selected
                                                ? s(
                                                      "combobox__option--selected",
                                                  )
                                                : "",
                                        ]
                                            .filter(Boolean)
                                            .join(" ")}
                                        onMouseEnter={() => setActiveIndex(i)}
                                        onMouseDown={(e) => {
                                            // Prevent blur of search input before click
                                            e.preventDefault();
                                        }}
                                        onClick={() => commitOption(opt)}
                                    >
                                        <span
                                            className={s(
                                                "combobox__option-label",
                                            )}
                                        >
                                            {renderOption(opt)}
                                        </span>
                                        {selected && (
                                            <span
                                                className={s(
                                                    "combobox__option-check",
                                                )}
                                                aria-hidden="true"
                                            >
                                                <Icon name="check" size={14} />
                                            </span>
                                        )}
                                    </li>
                                );
                            })}
                    </ul>
                </div>,
                portal,
            )}

            {error && (
                <p
                    id={errorId}
                    className={[
                        s("combobox__description"),
                        s("combobox__description--error"),
                        errorClassName,
                    ]
                        .filter(Boolean)
                        .join(" ")}
                >
                    {error}
                </p>
            )}

            {description && !error && (
                <p
                    id={descriptionId}
                    className={[
                        s("combobox__description"),
                        descriptionClassName,
                    ]
                        .filter(Boolean)
                        .join(" ")}
                >
                    {description}
                </p>
            )}
        </div>
    );
};

export default Combobox;
