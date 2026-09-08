import { type FC, useEffect, useRef, useState, type ChangeEvent } from "react";
import styles from "../input/Input.module.css";
import Icon from "../icon/Icon.tsx";

const s = (cls: string): string => styles[cls] ?? "";

export interface SearchInputProps
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        "type" | "onChange"
    > {
    label?: string;
    description?: string;
    error?: string;

    className?: string;
    containerClassName?: string;
    labelClassName?: string;
    descriptionClassName?: string;
    errorClassName?: string;

    /**
     * Debounce delay in milliseconds.
     * Default: 300ms
     */
    debounceMs?: number;

    /**
     * Controlled value. Optional — supports uncontrolled via defaultValue.
     */
    value?: string;

    /**
     * Called immediately when the input value changes.
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;

    /**
     * Called after the debounce delay with the current value.
     */
    onSearch?: (value: string) => void;

    /**
     * Called when the clear button is clicked.
     */
    onClear?: () => void;
}

const SearchInput: FC<SearchInputProps> = ({
    label,
    description,
    error,
    disabled,

    className = "",
    containerClassName = "",
    labelClassName = "",
    descriptionClassName = "",
    errorClassName = "",

    value,
    defaultValue,
    debounceMs = 300,

    onChange,
    onSearch,
    onClear,

    ...props
}) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<string>(
        (defaultValue as string) ?? "",
    );
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const currentValue = isControlled ? (value as string) : internalValue;
    const hasValue = currentValue.length > 0;

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isFirstRun = useRef(true);
    useEffect(() => {
        if (!onSearch) return;
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            onSearch(currentValue);
        }, debounceMs);
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [currentValue, debounceMs, onSearch]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (!isControlled) setInternalValue(event.target.value);
        onChange?.(event);
    };

    const handleClear = (): void => {
        if (!isControlled) setInternalValue("");
        if (inputRef.current) {
            const nativeSetter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                "value",
            )?.set;
            nativeSetter?.call(inputRef.current, "");
            const inputEvent = new Event("input", { bubbles: true });
            inputRef.current.dispatchEvent(inputEvent);
            onChange?.({
                ...(inputEvent as unknown as ChangeEvent<HTMLInputElement>),
                target: inputRef.current,
                currentTarget: inputRef.current,
            } as ChangeEvent<HTMLInputElement>);
        }
        onClear?.();
        inputRef.current?.focus();
    };

    return (
        <div
            className={[s("input__container"), containerClassName]
                .filter(Boolean)
                .join(" ")}
        >
            {label && (
                <label
                    className={[
                        s("input__label"),
                        error ? s("input__label--error") : "",
                        labelClassName,
                    ]
                        .filter(Boolean)
                        .join(" ")}
                >
                    {label}
                </label>
            )}

            <div
                className={[
                    s("input__wrapper"),
                    s("search-input__wrapper"),
                    error ? s("input__wrapper--error") : "",
                    disabled ? s("input__wrapper--disabled") : "",
                    isFocused ? s("input__wrapper--focused") : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                <Icon
                    name="search"
                    size={16}
                    className={s("search-input__icon")}
                />

                <input
                    {...props}
                    ref={inputRef}
                    type="search"
                    value={currentValue}
                    disabled={disabled}
                    onChange={handleChange}
                    onFocus={(event) => {
                        setIsFocused(true);
                        props.onFocus?.(event);
                    }}
                    onBlur={(event) => {
                        setIsFocused(false);
                        props.onBlur?.(event);
                    }}
                    className={[
                        s("input__field"),
                        s("search-input__field"),
                        error ? s("input__field--error") : "",
                        className,
                    ]
                        .filter(Boolean)
                        .join(" ")}
                />

                {hasValue && (
                    <button
                        type="button"
                        className={s("search-input__clear")}
                        onClick={handleClear}
                        disabled={disabled}
                        aria-label="Clear search"
                    >
                        <Icon name="x" size={16} />
                    </button>
                )}
            </div>

            {error && (
                <p
                    className={[
                        s("input__description"),
                        s("input__description--error"),
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
                    className={[
                        s("input__description"),
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

export default SearchInput;
