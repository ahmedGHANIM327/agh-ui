import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Sheet, { type SheetProps } from "./Sheet";
import Button from "../button/Button";
import Typography from "../typography/Typography";
import Input from "../input/Input";

const meta: Meta<SheetProps> = {
    title: "Sheet",
    component: Sheet,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Sheet is a full-height panel sliding from the left or right of the page, rendered in a portal. It works like Dialog (overlay, close button, Escape, trigger) and its content is scrollable.",
            },
        },
    },
    argTypes: {
        isOpen: {
            control: "boolean",
            description: "Whether the sheet is open.",
            table: { category: "State", type: { summary: "boolean" } },
        },
        onOpenChange: {
            control: false,
            description: "Callback called when the open state changes.",
            table: { category: "State", type: { summary: "(open: boolean) => void" } },
        },
        children: {
            control: false,
            description: "Content rendered inside the sheet.",
            table: { category: "Content", type: { summary: "ReactNode" } },
        },
        trigger: {
            control: false,
            description: "Element that opens the sheet when clicked.",
            table: { category: "Content", type: { summary: "ReactNode" } },
        },
        position: {
            control: "select",
            options: ["left", "right"],
            description: "Side of the page the sheet slides from.",
            table: {
                category: "Appearance",
                type: { summary: "SheetPosition" },
                defaultValue: { summary: "right" },
            },
        },
        header: {
            control: false,
            description: "Optional block pinned at the top, separated by a border.",
            table: { category: "Content", type: { summary: "ReactNode" } },
        },
        footer: {
            control: false,
            description: "Optional block pinned at the bottom, separated by a border.",
            table: { category: "Content", type: { summary: "ReactNode" } },
        },
        width: {
            control: "text",
            description: "Sheet width (number in px or CSS value). Adapts to the content by default.",
            table: { category: "Appearance", type: { summary: "number | string" } },
        },
        showOverlay: {
            control: "boolean",
            description: "Show the backdrop overlay behind the sheet.",
            table: {
                category: "Appearance",
                type: { summary: "boolean" },
                defaultValue: { summary: "true" },
            },
        },
        closeOnOverlayClick: {
            control: "boolean",
            description: "Close the sheet when clicking the overlay.",
            table: {
                category: "Behavior",
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        closeOnEsc: {
            control: "boolean",
            description: "Close the sheet when pressing the Escape key.",
            table: {
                category: "Behavior",
                type: { summary: "boolean" },
                defaultValue: { summary: "true" },
            },
        },
        closeButton: {
            control: "boolean",
            description: "Show a close button in the top-right corner.",
            table: {
                category: "Appearance",
                type: { summary: "boolean" },
                defaultValue: { summary: "true" },
            },
        },
        overlayClassName: {
            control: "text",
            description: "Additional CSS class for the overlay.",
            table: { category: "Styling", type: { summary: "string" } },
        },
        contentClassName: {
            control: "text",
            description: "Additional CSS class for the sheet content container.",
            table: { category: "Styling", type: { summary: "string" } },
        },
        closeButtonClassName: {
            control: "text",
            description: "Additional CSS class for the close button.",
            table: { category: "Styling", type: { summary: "string" } },
        },
    },
};

export default meta;

type Story = StoryObj<SheetProps>;

export const Default: Story = {
    args: {
        position: "right",
        showOverlay: true,
        closeOnOverlayClick: true,
        closeOnEsc: true,
        closeButton: true,
    },
    render: (args) => {
        const [open, setOpen] = useState(false);

        return (
            <Sheet
                {...args}
                isOpen={open}
                onOpenChange={setOpen}
                trigger={<Button label="Open sheet" />}
            >
                <Typography variant="h3">Sheet title</Typography>
                <Typography variant="p-sm" color="muted">
                    This is the sheet content. You can put anything here.
                </Typography>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <Button variant="outline" label="Cancel" onClick={() => setOpen(false)} />
                    <Button variant="primary" label="Confirm" onClick={() => setOpen(false)} />
                </div>
            </Sheet>
        );
    },
};

export const Left: Story = {
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <Sheet
                isOpen={open}
                onOpenChange={setOpen}
                position="left"
                closeOnOverlayClick
                trigger={<Button label="Open left sheet" />}
            >
                <Typography variant="h3">Navigation</Typography>
                <Typography variant="p-sm" color="muted">
                    This sheet slides from the left.
                </Typography>
            </Sheet>
        );
    },
};

export const WithForm: Story = {
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <Sheet
                isOpen={open}
                onOpenChange={setOpen}
                trigger={<Button label="Edit profile" />}
            >
                <Typography variant="h3">Edit profile</Typography>
                <Typography variant="p-sm" color="muted">
                    Update your account information below.
                </Typography>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <Input label="Name" placeholder="Your name" />
                    <Input label="Email" placeholder="your@email.com" type="email" />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <Button variant="outline" label="Cancel" onClick={() => setOpen(false)} />
                    <Button variant="primary" label="Save changes" onClick={() => setOpen(false)} />
                </div>
            </Sheet>
        );
    },
};

export const ScrollableContent: Story = {
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <Sheet
                isOpen={open}
                onOpenChange={setOpen}
                trigger={<Button label="Open long sheet" />}
            >
                <Typography variant="h3">Long content</Typography>
                {Array.from({ length: 30 }, (_, i) => (
                    <Typography key={i} variant="p-sm" color="muted">
                        Paragraph {i + 1}: the sheet takes the full height and scrolls when content overflows.
                    </Typography>
                ))}
            </Sheet>
        );
    },
};

export const WithoutOverlay: Story = {
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <Sheet
                isOpen={open}
                onOpenChange={setOpen}
                showOverlay={false}
                trigger={<Button label="Open without overlay" />}
            >
                <Typography variant="h3">No overlay</Typography>
                <Typography variant="p-sm" color="muted">
                    This sheet has no backdrop overlay.
                </Typography>
            </Sheet>
        );
    },
};

export const WithHeaderAndFooter: Story = {
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <Sheet
                isOpen={open}
                onOpenChange={setOpen}
                width={420}
                trigger={<Button label="Open with header & footer" />}
                header={
                    <>
                        <Typography variant="h3">Edit profile</Typography>
                        <Typography variant="p-sm" color="muted">
                            Update your account information.
                        </Typography>
                    </>
                }
                footer={
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                        <Button variant="outline" label="Cancel" onClick={() => setOpen(false)} />
                        <Button variant="primary" label="Save changes" onClick={() => setOpen(false)} />
                    </div>
                }
            >
                {Array.from({ length: 20 }, (_, i) => (
                    <Input key={i} label={`Field ${i + 1}`} placeholder="Value" />
                ))}
            </Sheet>
        );
    },
};
