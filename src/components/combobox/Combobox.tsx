import {
    type KeyboardEvent,
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

export interface ComboboxProps {
    options: string[];

    value?: string;
    defaultValue?: string;

    onValueChange?: (value: string) => void;

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

const Combobox = ({
    options,
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
}: ComboboxProps) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<string | undefined>(
        defaultValue,
    );
    const currentValue = isControlled ? value : internalValue;

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

    // Filtered options
    const filtered = useMemo(() => {
        if (!searchable || !query.trim()) return options;
        const q = query.toLowerCase();
        return options.filter((o) => o.toLowerCase().includes(q));
    }, [options, query, searchable]);

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
    // We do the reset / active-index init synchronously here (in the event
    // that triggers the state change) instead of in a useEffect on `open`,
    // to avoid `react-hooks/set-state-in-effect` (cascading renders).
    const setOpenState = useCallback(
        (next: boolean) => {
            setOpen(next);
            if (next) {
                const source = searchable && !query.trim() ? options : filtered;
                const selectedIdx = currentValue
                    ? source.indexOf(currentValue)
                    : -1;
                setActiveIndex(
                    selectedIdx >= 0 ? selectedIdx : source.length ? 0 : -1,
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
        [searchable, query, options, filtered, currentValue],
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

    // Keep activeIndex in bounds when filtered changes (e.g. while typing in
    // the search input). Done at render time to avoid `set-state-in-effect`.
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

    const commitValue = (v: string) => {
        if (!isControlled) setInternalValue(v);
        onValueChange?.(v);
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
                    commitValue(filtered[safeActiveIndex]);
                }
                break;
            case "Escape":
                e.preventDefault();
                setOpenState(false);
                requestAnimationFrame(() => triggerRef.current?.focus());
                break;
        }
    };

    const displayLabel = currentValue ?? "";

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

            <div className={[s("combobox"), className].filter(Boolean).join(" ")}>
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
                    onClick={() => (open ? setOpenState(false) : openDropdown())}
                    onKeyDown={handleTriggerKeyDown}
                >
                    <span
                        className={[
                            s("combobox__value"),
                            !displayLabel ? s("combobox__value--placeholder") : "",
                        ]
                            .filter(Boolean)
                            .join(" ")}
                    >
                        {displayLabel || placeholder}
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
                        // Prevent trigger button from losing focus / dropdown from closing
                        // when interacting with anything inside the portal.
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
                                const selected = opt === currentValue;
                                const active = i === safeActiveIndex;
                                return (
                                    <li
                                        key={opt}
                                        id={optionId(i)}
                                        role="option"
                                        aria-selected={selected}
                                        className={[
                                            s("combobox__option"),
                                            active
                                                ? s("combobox__option--active")
                                                : "",
                                            selected
                                                ? s("combobox__option--selected")
                                                : "",
                                        ]
                                            .filter(Boolean)
                                            .join(" ")}
                                        onMouseEnter={() => setActiveIndex(i)}
                                        onMouseDown={(e) => {
                                            // Prevent blur of search input before click
                                            e.preventDefault();
                                        }}
                                        onClick={() => commitValue(opt)}
                                    >
                                        <span
                                            className={s(
                                                "combobox__option-label",
                                            )}
                                        >
                                            {opt}
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
                    className={[s("combobox__description"), descriptionClassName]
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
