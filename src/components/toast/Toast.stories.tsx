import type { Meta, StoryObj } from "@storybook/react-vite";
import {
    toast,
    ToastProvider,
    type ToastOptions,
} from "./Toast";
import Button from "../button/Button";
import Card from "../card/Card";
import Typography from "../typography/Typography";
import {ICON_NAMES} from "../../icons/IconRegistry";

type ToastStoryArgs = ToastOptions & {
    label: string;
};

const meta: Meta<ToastStoryArgs> = {
    title: "Toast",
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Toast is a temporary feedback message displayed inside a dedicated portal. It supports custom position, duration, icon, description and optional auto-close behavior.",
            },
        },
    },
    decorators: [
        (Story) => (
            <ToastProvider>
                <Story />
            </ToastProvider>
        ),
    ],
    argTypes: {
        label: {
            control: "text",
            description: "Main text displayed inside the toast.",
            table: {
                category: "Content",
                type: { summary: "string" },
            },
        },

        description: {
            control: "text",
            description: "Optional secondary text displayed below the label.",
            table: {
                category: "Content",
                type: { summary: "string" },
            },
        },

        type: {
            control: "select",
            options: [
                "default",
                "success",
                "warning",
                "error",
            ],
            description: "Type of the toast.",
            table: {
                category: "Behavior",
                type: { summary: "ToastType" },
                defaultValue: { summary: "error" },
            },
        },

        iconName: {
            control: "select",
            description: "Optional icon displayed before the content.",
            options:ICON_NAMES,
            table: {
                category: "Content",
                type: { summary: "IconName" },
            },
        },

        position: {
            control: "select",
            options: [
                "top-left",
                "top-center",
                "top-right",
                "bottom-left",
                "bottom-center",
                "bottom-right",
            ],
            description: "Position of the toast viewport.",
            table: {
                category: "Behavior",
                type: { summary: "ToastPosition" },
                defaultValue: { summary: "top-center" },
            },
        },

        duration: {
            control: {
                type: "number",
                min: 500,
                step: 500,
            },
            description: "Delay in milliseconds before auto-closing the toast.",
            table: {
                category: "Behavior",
                type: { summary: "number" },
                defaultValue: { summary: "3000" },
            },
        },

        autoClose: {
            control: "boolean",
            description: "Whether the toast should close automatically after the duration.",
            table: {
                category: "Behavior",
                type: { summary: "boolean" },
                defaultValue: { summary: "true" },
            },
        },
    },
};

export default meta;

type Story = StoryObj<ToastStoryArgs>;

export const Default: Story = {
    args: {
        label: "Toast Label",
        description: "This is a toast description.",
        iconName: "info",
        position: "top-center",
        duration: 3000,
        autoClose: true,
    },
    render: ({
                 label,
                 description,
                 iconName,
                 position,
                 duration,
                 autoClose,
                 type
             }) => (
        <Card
            style={{
                width: "400px",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}
        >
            <Typography variant="h3">
                Toast playground
            </Typography>

            <Typography variant="p-sm" color="muted">
                Change the controls, then click the button to display the toast.
            </Typography>

            <Button
                label="Show toast"
                onClick={() =>
                    toast(label, {
                        description,
                        iconName,
                        position,
                        duration,
                        autoClose,
                        type
                    })
                }
            />
        </Card>
    ),
};

export const PersistentToast: Story = {
    args: {
        label: "Persistent toast",
        description: "This toast will stay visible until closed manually.",
        iconName: "info",
        position: "top-center",
        duration: 3000,
        autoClose: false,
    },
    render: (args) => (
        <Button
            label="Show persistent toast"
            onClick={() => toast(args.label, args)}
        />
    ),
};

export const Positions: Story = {
    render: () => (
        <Card
            style={{
                width: "420px",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}
        >
            <Typography variant="h3">
                Toast positions
            </Typography>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0.75rem",
                }}
            >
                <Button
                    label="Top left"
                    onClick={() =>
                        toast("Top left", {
                            position: "top-left",
                            iconName: "info",
                        })
                    }
                />

                <Button
                    label="Top center"
                    onClick={() =>
                        toast("Top center", {
                            position: "top-center",
                            iconName: "info",
                        })
                    }
                />

                <Button
                    label="Top right"
                    onClick={() =>
                        toast("Top right", {
                            position: "top-right",
                            iconName: "info",
                        })
                    }
                />

                <Button
                    label="Bottom left"
                    onClick={() =>
                        toast("Bottom left", {
                            position: "bottom-left",
                            iconName: "info",
                        })
                    }
                />

                <Button
                    label="Bottom center"
                    onClick={() =>
                        toast("Bottom center", {
                            position: "bottom-center",
                            iconName: "info",
                        })
                    }
                />

                <Button
                    label="Bottom right"
                    onClick={() =>
                        toast("Bottom right", {
                            position: "bottom-right",
                            iconName: "info",
                        })
                    }
                />
            </div>
        </Card>
    ),
};

export const Types: Story = {
    render: () => (
        <Card
            style={{
                width: "420px",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}
        >
            <Typography variant="h3">
                Toast types
            </Typography>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0.75rem",
                }}
            >
                <Button
                    label="Top default"
                    onClick={() =>
                        toast("Top default")
                    }
                />

                <Button
                    label="Top success"
                    onClick={() =>
                        toast("Top success", {
                            type: "success"
                        })
                    }
                />

                <Button
                    label="Top warning"
                    onClick={() =>
                        toast("Top warning", {
                            type: "warning"
                        })
                    }
                />

                <Button
                    label="Top error"
                    onClick={() =>
                        toast("Top error", {
                            type: "error"
                        })
                    }
                />
            </div>
        </Card>
    ),
};