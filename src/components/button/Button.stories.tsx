import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "./Button";

const meta: Meta<typeof Button> = {
    title: "Button",
    component: Button,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Button is used to trigger actions or events. It supports multiple variants, sizes, icons, loading and disabled states.",
            },
        },
    },
    args: {
        label: "Button",
        variant: "default",
        size: "default",
        iconPosition: "left",
        isLoading: false,
        disabled: false,
    },
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "primary", "outline", "destructive", "link", "ghost"],
            description: "Defines the visual style of the button.",
            table: {
                category: "Appearance",
                type: {
                    summary: `"default" | "primary" | "outline" | "destructive" | "link" | "ghost"`,
                },
                defaultValue: {
                    summary: "default",
                },
            },
        },

        size: {
            control: "select",
            options: ["default", "sm", "lg", "icon"],
            description: "Defines the size of the button.",
            table: {
                category: "Appearance",
                type: {
                    summary: `"default" | "sm" | "lg" | "icon"`,
                },
                defaultValue: {
                    summary: "default",
                },
            },
        },

        label: {
            control: "text",
            description: "Text displayed inside the button.",
            table: {
                category: "Content",
                type: {
                    summary: "string",
                },
            },
        },

        iconName: {
            control: "select",
            description: "Name of the icon displayed inside the button.",
            table: {
                category: "Icon",
                type: {
                    summary: "IconName",
                },
            },
        },

        iconSize: {
            control: "number",
            description: "Overrides the default icon size based on button size.",
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
            description: "Defines the icon position when the button has a label.",
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

        isLoading: {
            control: "boolean",
            description: "Displays a spinner and disables the button.",
            table: {
                category: "State",
                type: {
                    summary: "boolean",
                },
                defaultValue: {
                    summary: "false",
                },
            },
        },

        disabled: {
            control: "boolean",
            description: "Disables the button.",
            table: {
                category: "State",
                type: {
                    summary: "boolean",
                },
                defaultValue: {
                    summary: "false",
                },
            },
        },

        type: {
            control: "select",
            options: ["button", "submit", "reset"],
            description: "Native button type attribute.",
            table: {
                category: "HTML Attributes",
                type: {
                    summary: `"button" | "submit" | "reset"`,
                },
            },
        },

        onClick: {
            action: "clicked",
            description: "Callback fired when the button is clicked.",
            table: {
                category: "Events",
                type: {
                    summary: "(event: MouseEvent<HTMLButtonElement>) => void",
                },
            },
        },

        className: {
            control: false,
            description: "Custom class applied to the button element.",
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

type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

export const Default: Story = {
    args: {
        label: "Button",
    },
};

export const Variants: Story = {
    render: () => (
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Button label="Default" variant="default" />
            <Button label="Primary" variant="primary" />
            <Button label="Outline" variant="outline" />
            <Button label="Destructive" variant="destructive" />
            <Button label="Ghost" variant="ghost" />
            <Button label="Link" variant="link" />
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <Button label="Small" size="sm" />
            <Button label="Default" size="default" />
            <Button label="Large" size="lg" />
            <Button iconName="plus" size="icon" aria-label="Add item" />
        </div>
    ),
};

export const WithIcon: Story = {
    render: () => (
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Button label="Add item" iconName="plus" />
            <Button label="Edit item" iconName="edit" />
            <Button label="Next" iconName="chevronDown" iconPosition="right" />
        </div>
    ),
};

export const IconOnly: Story = {
    args: {
        size: "icon",
        iconName: "plus",
        "aria-label": "Add item",
    },
};

export const Loading: Story = {
    args: {
        label: "Loading",
        isLoading: true,
    },
};

export const Disabled: Story = {
    args: {
        label: "Disabled",
        disabled: true,
    },
};

export const DestructiveAction: Story = {
    args: {
        label: "Delete",
        variant: "destructive",
        iconName: "edit",
    },
};