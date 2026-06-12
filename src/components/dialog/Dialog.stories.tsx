import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Dialog, { type DialogProps } from "./Dialog";
import Button from "../button/Button";
import Card from "../card/Card";
import Typography from "../typography/Typography";
import Input from "../input/Input";
import { toast, ToastProvider } from "../toast/Toast";

const meta: Meta<DialogProps> = {
    title: "Dialog",
    component: Dialog,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Dialog is a modal window rendered in a dedicated portal. It supports overlay, close button, keyboard accessibility and controlled/uncontrolled usage via trigger.",
            },
        },
    },
    argTypes: {
        isOpen: {
            control: "boolean",
            description: "Whether the dialog is open.",
            table: {
                category: "State",
                type: { summary: "boolean" },
            },
        },

        onOpenChange: {
            control: false,
            description: "Callback called when the open state changes.",
            table: {
                category: "State",
                type: { summary: "(open: boolean) => void" },
            },
        },

        children: {
            control: false,
            description: "Content rendered inside the dialog.",
            table: {
                category: "Content",
                type: { summary: "ReactNode" },
            },
        },

        trigger: {
            control: false,
            description: "Element that opens the dialog when clicked.",
            table: {
                category: "Content",
                type: { summary: "ReactNode" },
            },
        },

        showOverlay: {
            control: "boolean",
            description: "Show the backdrop overlay behind the dialog.",
            table: {
                category: "Appearance",
                type: { summary: "boolean" },
                defaultValue: { summary: "true" },
            },
        },

        closeOnOverlayClick: {
            control: "boolean",
            description: "Close the dialog when clicking the overlay.",
            table: {
                category: "Behavior",
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },

        closeOnEsc: {
            control: "boolean",
            description: "Close the dialog when pressing the Escape key.",
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
            table: {
                category: "Styling",
                type: { summary: "string" },
            },
        },

        contentClassName: {
            control: "text",
            description: "Additional CSS class for the dialog content container.",
            table: {
                category: "Styling",
                type: { summary: "string" },
            },
        },

        closeButtonClassName: {
            control: "text",
            description: "Additional CSS class for the close button.",
            table: {
                category: "Styling",
                type: { summary: "string" },
            },
        },
    },
};

export default meta;

type Story = StoryObj<DialogProps>;

export const Default: Story = {
    args: {
        showOverlay: true,
        closeOnOverlayClick: true,
        closeOnEsc: true,
        closeButton: true,
    },
    render: (args) => {
        const [open, setOpen] = useState(false);

        return (
            <Dialog
                {...args}
                isOpen={open}
                onOpenChange={setOpen}
                trigger={<Button label="Open dialog" />}
            >
                <Typography variant="h3">Dialog title</Typography>
                <Typography variant="p-sm" color="muted">
                    This is the dialog content. You can put anything here.
                </Typography>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <Button variant="outline" label="Cancel" onClick={() => setOpen(false)} />
                    <Button variant="primary" label="Confirm" onClick={() => setOpen(false)} />
                </div>
            </Dialog>
        );
    },
};

export const WithForm: Story = {
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <Dialog
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
            </Dialog>
        );
    },
};

export const WithoutOverlay: Story = {
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <Dialog
                isOpen={open}
                onOpenChange={setOpen}
                showOverlay={false}
                trigger={<Button label="Open without overlay" />}
            >
                <Typography variant="h3">No overlay</Typography>
                <Typography variant="p-sm" color="muted">
                    This dialog has no backdrop overlay.
                </Typography>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.5rem" }}>
                    <Button variant="primary" label="Close" onClick={() => setOpen(false)} />
                </div>
            </Dialog>
        );
    },
};

export const WithoutCloseButton: Story = {
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <Dialog
                isOpen={open}
                onOpenChange={setOpen}
                closeButton={false}
                trigger={<Button label="Open dialog" />}
            >
                <Typography variant="h3">No close button</Typography>
                <Typography variant="p-sm" color="muted">
                    This dialog has no close button. Use the actions below or press Escape.
                </Typography>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <Button variant="outline" label="Cancel" onClick={() => setOpen(false)} />
                    <Button variant="primary" label="Confirm" onClick={() => setOpen(false)} />
                </div>
            </Dialog>
        );
    },
};

export const NestedDialogs: Story = {
    render: () => {
        const [outerOpen, setOuterOpen] = useState(false);
        const [innerOpen, setInnerOpen] = useState(false);

        return (
            <Dialog
                isOpen={outerOpen}
                onOpenChange={(open) => {
                    setOuterOpen(open);
                    if (!open) setInnerOpen(false);
                }}
                trigger={<Button label="Open outer dialog" />}
            >
                <Typography variant="h3">Outer dialog</Typography>
                <Typography variant="p-sm" color="muted">
                    This is the first dialog. You can open a second one from here.
                </Typography>

                <Dialog
                    isOpen={innerOpen}
                    onOpenChange={setInnerOpen}
                    trigger={<Button variant="outline" label="Open inner dialog" />}
                >
                    <Typography variant="h3">Inner dialog</Typography>
                    <Typography variant="p-sm" color="muted">
                        This dialog was opened from within another dialog.
                    </Typography>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.5rem" }}>
                        <Button variant="primary" label="Close inner" onClick={() => setInnerOpen(false)} />
                    </div>
                </Dialog>

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.5rem" }}>
                    <Button variant="outline" label="Close outer" onClick={() => setOuterOpen(false)} />
                </div>
            </Dialog>
        );
    },
};

export const WithToastOnConfirm: Story = {
    render: () => {
        const [open, setOpen] = useState(false);

        const handleConfirm = () => {
            setOpen(false);
            toast("Changes saved successfully", {
                type: "success",
                description: "Your profile has been updated.",
                position: "top-right",
            });
        };

        const handleCancel = () => {
            setOpen(false);
            toast("Action cancelled", {
                type: "error",
                position: "top-right",
            });
        };

        return (
            <ToastProvider>
                <Dialog
                    isOpen={open}
                    onOpenChange={setOpen}
                    trigger={<Button label="Edit profile" />}
                >
                    <Typography variant="h3">Edit profile</Typography>
                    <Typography variant="p-sm" color="muted">
                        Update your account information below.
                    </Typography>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        <Input label="Name" placeholder="Your name" defaultValue="John Doe" />
                        <Input label="Email" placeholder="your@email.com" type="email" defaultValue="john@example.com" />
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "0.5rem" }}>
                        <Button variant="outline" label="Cancel" onClick={handleCancel} />
                        <Button variant="primary" label="Save changes" onClick={handleConfirm} />
                    </div>
                </Dialog>
            </ToastProvider>
        );
    },
};

export const ControlledWithCard: Story = {
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <Card style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "340px" }}>
                <Typography variant="h3">Controlled dialog</Typography>
                <Typography variant="p-sm" color="muted">
                    The dialog state is managed externally.
                </Typography>
                <Typography variant="p-sm">
                    Dialog is: <strong>{open ? "open" : "closed"}</strong>
                </Typography>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Button label="Open" variant="primary" onClick={() => setOpen(true)} />
                    <Button label="Close" variant="outline" onClick={() => setOpen(false)} />
                </div>

                <Dialog isOpen={open} onOpenChange={setOpen}>
                    <Typography variant="h3">Controlled dialog</Typography>
                    <Typography variant="p-sm" color="muted">
                        This dialog is controlled from outside.
                    </Typography>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.5rem" }}>
                        <Button variant="primary" label="Done" onClick={() => setOpen(false)} />
                    </div>
                </Dialog>
            </Card>
        );
    },
};
