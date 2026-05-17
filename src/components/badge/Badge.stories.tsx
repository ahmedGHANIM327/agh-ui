import type { Meta, StoryObj } from "@storybook/react-vite";
import Badge from "./Badge";

const meta: Meta<typeof Badge> = {
    title: "Badge",
    component: Badge,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Badge is used to display small status indicators, labels or metadata. It supports variants, sizes and optional icons.",
            },
        },
    },

    args: {
        label: "Badge",
        variant: "default",
        size: "default",
        iconPosition: "left",
    },

    argTypes: {
        variant: {
            control: "select",
            options: ["default", "primary", "outline", "destructive"],
            description: "Defines the visual style of the badge.",
            table: {
                category: "Appearance",
                type: {
                    summary: `"default" | "primary" | "outline" | "destructive"`,
                },
                defaultValue: {
                    summary: "default",
                },
            },
        },

        size: {
            control: "select",
            options: ["sm", "default", "lg"],
            description: "Defines the size of the badge.",
            table: {
                category: "Appearance",
                type: {
                    summary: `"sm" | "default" | "lg"`,
                },
                defaultValue: {
                    summary: "default",
                },
            },
        },

        label: {
            control: "text",
            description: "Text displayed inside the badge.",
            table: {
                category: "Content",
                type: {
                    summary: "string",
                },
            },
        },

        iconName: {
            control: "text",
            description: "Optional icon displayed inside the badge.",
            table: {
                category: "Icon",
                type: {
                    summary: "IconName",
                },
            },
        },

        iconSize: {
            control: "number",
            description: "Overrides the default icon size based on badge size.",
            table: {
                category: "Icon",
                type: {
                    summary: "number",
                },
            },
        },

        iconPosition: {
            control: "select",
            options: ["left", "right"],
            description: "Defines the icon position relative to the label.",
            table: {
                category: "Icon",
                type: {
                    summary: `"left" | "right"`,
                },
                defaultValue: {
                    summary: "left",
                },
            },
        },

        className: {
            control: false,
            description: "Custom class applied to the badge container.",
            table: {
                category: "Styling",
                type: {
                    summary: "string",
                },
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Playground: Story = {};

export const Default: Story = {
    args: {
        label: "Badge",
    },
};

export const Variants: Story = {
    render: () => (
        <div
            style={{
                display: "flex",
                gap: "0.75rem",
                flexWrap: "wrap",
            }}
        >
            <Badge label="Default" variant="default" />
            <Badge label="Primary" variant="primary" />
            <Badge label="Outline" variant="outline" />
            <Badge label="Destructive" variant="destructive" />
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div
            style={{
                display: "flex",
                gap: "0.75rem",
                alignItems: "center",
            }}
        >
            <Badge label="Small" size="sm" />
            <Badge label="Default" size="default" />
            <Badge label="Large" size="lg" />
        </div>
    ),
};

export const WithIcon: Story = {
    render: () => (
        <div
            style={{
                display: "flex",
                gap: "0.75rem",
                flexWrap: "wrap",
            }}
        >
            <Badge
                label="Success"
                iconName="plus"
                variant="primary"
            />

            <Badge
                label="Warning"
                iconName="chevronDown"
                variant="outline"
            />

            <Badge
                label="Delete"
                iconName="edit"
                variant="destructive"
            />
        </div>
    ),
};

export const IconRight: Story = {
    args: {
        label: "Next",
        iconName: "plus",
        iconPosition: "right",
        variant: "primary",
    },
};

export const WithoutLabel: Story = {
    args: {
        iconName: "edit",
        variant: "primary",
    },
};

export const StatusExamples: Story = {
    render: () => (
        <div
            style={{
                display: "flex",
                gap: "0.75rem",
                flexWrap: "wrap",
            }}
        >
            <Badge
                label="Active"
                iconName="plus"
                variant="primary"
            />

            <Badge
                label="Pending"
                iconName="edit"
                variant="outline"
            />

            <Badge
                label="Error"
                iconName="chevronDown"
                variant="destructive"
            />
        </div>
    ),
};