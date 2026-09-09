import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useId, useState, type FC } from "react";
import Button from "../button/Button";
import Combobox from "../combobox/Combobox";
import styles from "./RichText.module.css";

const s = (cls: string): string => styles[cls] ?? "";

export interface RichTextProps {
    /** Controlled HTML value. */
    value?: string;
    /** Uncontrolled initial HTML value. */
    defaultValue?: string;
    /** Called on every change with the new HTML string. */
    onChange?: (html: string) => void;

    placeholder?: string;

    label?: string;
    description?: string;
    error?: string;

    disabled?: boolean;

    id?: string;
    name?: string;

    className?: string;
    containerClassName?: string;
    labelClassName?: string;
    descriptionClassName?: string;
    errorClassName?: string;
    toolbarClassName?: string;
    editorClassName?: string;
}

type HeadingValue = "paragraph" | "h1" | "h2" | "h3";

const headingOptions: { value: HeadingValue; label: string }[] = [
    { value: "paragraph", label: "Paragraph" },
    { value: "h1", label: "Heading 1" },
    { value: "h2", label: "Heading 2" },
    { value: "h3", label: "Heading 3" },
];

const getHeadingValue = (editor: Editor): HeadingValue => {
    if (editor.isActive("heading", { level: 1 })) return "h1";
    if (editor.isActive("heading", { level: 2 })) return "h2";
    if (editor.isActive("heading", { level: 3 })) return "h3";
    return "paragraph";
};

const RichText: FC<RichTextProps> = ({
    value,
    defaultValue,
    onChange,
    placeholder = "Write something...",
    label,
    description,
    error,
    disabled = false,
    id,
    name,
    className = "",
    containerClassName = "",
    labelClassName = "",
    descriptionClassName = "",
    errorClassName = "",
    toolbarClassName = "",
    editorClassName = "",
}) => {
    const isControlled = value !== undefined;

    const [isFocused, setIsFocused] = useState(false);

    const reactId = useId();
    const baseId = id ?? `rich-text-${reactId}`;

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] },
            }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                HTMLAttributes: {
                    class: s("rich-text__link"),
                },
            }),
            Placeholder.configure({
                placeholder,
                emptyEditorClass: s("rich-text__editor--empty"),
            }),
        ],
        content: isControlled ? value : (defaultValue ?? ""),
        editable: !disabled,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                id: baseId,
                name: name ?? "",
                class: [s("rich-text__editor"), editorClassName]
                    .filter(Boolean)
                    .join(" "),
            },
        },
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML());
        },
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
    });

    // Sync external value → editor (controlled mode).
    useEffect(() => {
        if (!editor || !isControlled) return;
        const current = editor.getHTML();
        if (value !== current) {
            editor.commands.setContent(value ?? "", { emitUpdate: false });
        }
    }, [value, isControlled, editor]);

    // Sync disabled state.
    useEffect(() => {
        if (!editor) return;
        editor.setEditable(!disabled);
    }, [editor, disabled]);

    if (!editor) return null;

    const currentHeading = getHeadingValue(editor);

    const handleHeadingChange = (v: string) => {
        const chain = editor.chain().focus();
        switch (v as HeadingValue) {
            case "h1":
                chain.toggleHeading({ level: 1 }).run();
                break;
            case "h2":
                chain.toggleHeading({ level: 2 }).run();
                break;
            case "h3":
                chain.toggleHeading({ level: 3 }).run();
                break;
            default:
                chain.setParagraph().run();
                break;
        }
    };

    const addOrEditLink = () => {
        const previousUrl = editor.getAttributes("link").href as
            | string
            | undefined;
        const url = window.prompt("Enter URL:", previousUrl ?? "https://");

        if (url === null) return; // cancelled
        if (url === "") {
            editor.chain().focus().unsetLink().run();
            return;
        }
        editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
    };

    const descriptionId = description ? `${baseId}-description` : undefined;
    const errorId = error ? `${baseId}-error` : undefined;

    return (
        <div
            className={[s("rich-text__container"), containerClassName]
                .filter(Boolean)
                .join(" ")}
        >
            {label && (
                <label
                    htmlFor={baseId}
                    className={[
                        s("rich-text__label"),
                        error ? s("rich-text__label--error") : "",
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
                    s("rich-text__wrapper"),
                    isFocused ? s("rich-text__wrapper--focused") : "",
                    error ? s("rich-text__wrapper--error") : "",
                    disabled ? s("rich-text__wrapper--disabled") : "",
                    className,
                ]
                    .filter(Boolean)
                    .join(" ")}
                aria-invalid={error ? true : undefined}
                aria-describedby={errorId ?? descriptionId}
            >
                {/* ── Toolbar ─────────────────────────────────────────── */}
                <div
                    className={[s("rich-text__toolbar"), toolbarClassName]
                        .filter(Boolean)
                        .join(" ")}
                    role="toolbar"
                    aria-label="Text formatting"
                >
                    <div className={s("rich-text__heading-select")}>
                        <Combobox<{ value: HeadingValue; label: string }>
                            options={headingOptions}
                            value={currentHeading}
                            onValueChange={(v) => handleHeadingChange(v as string)}
                            getOptionValue={(o) => o.value}
                            renderOption={(o) => o.label}
                            renderValue={(o) => o.label}
                            disabled={disabled}
                            placeholder="Style"
                        />
                    </div>

                    <Button
                        type="button"
                        variant={editor.isActive("bold") ? "default" : "outline"}
                        size="icon"
                        iconName="bold"
                        onClick={() =>
                            editor.chain().focus().toggleBold().run()
                        }
                        disabled={disabled}
                        title="Bold (Ctrl+B)"
                        aria-label="Bold"
                        aria-pressed={editor.isActive("bold")}
                    />

                    <Button
                        type="button"
                        variant={
                            editor.isActive("italic") ? "default" : "outline"
                        }
                        size="icon"
                        iconName="italic"
                        onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                        }
                        disabled={disabled}
                        title="Italic (Ctrl+I)"
                        aria-label="Italic"
                        aria-pressed={editor.isActive("italic")}
                    />

                    <Button
                        type="button"
                        variant={
                            editor.isActive("bulletList")
                                ? "default"
                                : "outline"
                        }
                        size="icon"
                        iconName="list"
                        onClick={() =>
                            editor.chain().focus().toggleBulletList().run()
                        }
                        disabled={disabled}
                        title="Bullet list"
                        aria-label="Bullet list"
                        aria-pressed={editor.isActive("bulletList")}
                    />

                    <Button
                        type="button"
                        variant={
                            editor.isActive("orderedList")
                                ? "default"
                                : "outline"
                        }
                        size="icon"
                        iconName="listOrdered"
                        onClick={() =>
                            editor.chain().focus().toggleOrderedList().run()
                        }
                        disabled={disabled}
                        title="Ordered list"
                        aria-label="Ordered list"
                        aria-pressed={editor.isActive("orderedList")}
                    />

                    <Button
                        type="button"
                        variant={editor.isActive("link") ? "default" : "outline"}
                        size="icon"
                        iconName="link"
                        onClick={addOrEditLink}
                        disabled={disabled}
                        title="Insert / edit link"
                        aria-label="Insert or edit link"
                        aria-pressed={editor.isActive("link")}
                    />
                </div>

                {/* ── Editor ──────────────────────────────────────────── */}
                <EditorContent editor={editor} />
            </div>

            {error && (
                <p
                    id={errorId}
                    className={[
                        s("rich-text__description"),
                        s("rich-text__description--error"),
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
                    className={[s("rich-text__description"), descriptionClassName]
                        .filter(Boolean)
                        .join(" ")}
                >
                    {description}
                </p>
            )}
        </div>
    );
};

export default RichText;
