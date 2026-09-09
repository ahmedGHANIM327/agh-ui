import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import RichText from "./RichText";

const meta: Meta<typeof RichText> = {
    title: "RichText",
    component: RichText,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Rich text editor built on top of Tiptap. Styled to match the Input component: label, description, error, focus ring. Toolbar exposes a heading Combobox and format buttons (bold, italic, lists, link).",
            },
        },
    },
    decorators: [
        (Story) => (
            <div style={{ width: 560 }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof RichText>;

export const Default: Story = {
    args: {
        label: "Description",
        placeholder: "Write your description...",
        description: "Supports headings, bold, italic, lists and links.",
    },
};

export const WithDefaultValue: Story = {
    args: {
        ...Default.args,
        defaultValue:
            "<h2>Hello world</h2><p>This editor is <strong>ready</strong> to use with <em>rich</em> formatting and <a href='https://example.com'>links</a>.</p><ul><li>Item one</li><li>Item two</li></ul>",
    },
};

export const WithError: Story = {
    args: {
        ...Default.args,
        error: "Description is required.",
    },
};

export const Disabled: Story = {
    args: {
        ...Default.args,
        defaultValue: "<p>This editor is read-only.</p>",
        disabled: true,
    },
};

export const Controlled: Story = {
    render: (args) => {
        const [html, setHtml] = useState<string>(
            "<p>Start typing...</p>",
        );
        return (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <RichText {...args} value={html} onChange={setHtml} />
                <details>
                    <summary
                        style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: 12,
                            cursor: "pointer",
                        }}
                    >
                        HTML output
                    </summary>
                    <pre
                        style={{
                            background: "var(--muted)",
                            padding: 8,
                            borderRadius: 6,
                            fontSize: 12,
                            overflowX: "auto",
                        }}
                    >
                        {html}
                    </pre>
                </details>
            </div>
        );
    },
    args: {
        label: "Content",
        placeholder: "Write something...",
    },
};
