import type { Meta, StoryObj } from "@storybook/react-vite";
import Switch from "./Switch";

const meta: Meta<typeof Switch> = {
    title: "Switch",
    component: Switch,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Switch is a toggle component used to turn a setting on or off. It supports a card-style layout with label and description, or can be used as a bare toggle.",
            },
        },
    },

    args: {
        label: "Enable notifications",
        description: "Receive push notifications when new messages arrive.",
    },

    argTypes: {
        label: {
            control: "text",
            description: "Label displayed beside the switch.",
            table: {
                category: "Content",
                type: { summary: "string" },
            },
        },

        description: {
            control: "text",
            description: "Helper text displayed below the label.",
            table: {
                category: "Content",
                type: { summary: "string" },
            },
        },

        error: {
            control: "text",
            description: "Error message displayed below the label.",
            table: {
                category: "Validation",
                type: { summary: "string" },
            },
        },

        disabled: {
            control: "boolean",
            description: "Disables the switch.",
            table: {
                category: "State",
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },

        checked: {
            control: "boolean",
            description: "Controlled checked state.",
            table: {
                category: "State",
                type: { summary: "boolean" },
            },
        },

        defaultChecked: {
            control: "boolean",
            description: "Initial checked state for uncontrolled usage.",
            table: {
                category: "State",
                type: { summary: "boolean" },
            },
        },

        onChange: {
            action: "changed",
            description: "Callback fired when the switch is toggled.",
            table: {
                category: "Events",
                type: { summary: "(event: ChangeEvent<HTMLInputElement>) => void" },
            },
        },

        name: {
            control: "text",
            description: "Name attribute of the input element.",
            table: {
                category: "HTML Attributes",
                type: { summary: "string" },
            },
        },

        id: {
            control: "text",
            description: "ID of the input element used to associate the label.",
            table: {
                category: "HTML Attributes",
                type: { summary: "string" },
            },
        },

        className: {
            control: false,
            description: "Custom class applied to the switch bare wrapper (bare mode only).",
            table: {
                category: "Styling",
                type: { summary: "string" },
            },
        },

        containerClassName: {
            control: false,
            description: "Custom class applied to the card container.",
            table: {
                category: "Styling",
                type: { summary: "string" },
            },
        },

        labelClassName: {
            control: false,
            description: "Custom class applied to the label element.",
            table: {
                category: "Styling",
                type: { summary: "string" },
            },
        },

        descriptionClassName: {
            control: false,
            description: "Custom class applied to the description element.",
            table: {
                category: "Styling",
                type: { summary: "string" },
            },
        },

        errorClassName: {
            control: false,
            description: "Custom class applied to the error message element.",
            table: {
                category: "Styling",
                type: { summary: "string" },
            },
        },

        variant: {
            control: "select",
            options: ["default", "outline", "primary"],
            description:
                "`default` — no border/background. `outline` — bordered card. `primary` — primary-tinted card.",
            table: {
                category: "Appearance",
                type: { summary: '"default" | "outline" | "primary"' },
                defaultValue: { summary: "default" },
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Playground: Story = {};

export const Default: Story = {
    args: {
        label: "Enable notifications",
        description: "Receive push notifications when new messages arrive.",
        variant: "default",
    },
};

export const Outline: Story = {
    args: {
        label: "Enable notifications",
        description: "Receive push notifications when new messages arrive.",
        variant: "outline",
    },
};

export const Primary: Story = {
    args: {
        label: "Enable notifications",
        description: "Receive push notifications when new messages arrive.",
        variant: "primary",
        defaultChecked: true,
    },
};

export const AllVariants: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "24rem" }}>
            <Switch
                label="Default variant"
                description="No border, no background."
                variant="default"
            />
            <Switch
                label="Outline variant"
                description="Bordered card."
                variant="outline"
            />
            <Switch
                label="Primary variant"
                description="Primary-tinted card."
                variant="primary"
                defaultChecked
            />
        </div>
    ),
};

export const Checked: Story = {
    args: {
        label: "Dark mode",
        description: "Switch to a dark theme interface.",
        defaultChecked: true,
    },
};

export const WithError: Story = {
    args: {
        label: "Accept terms",
        error: "You must accept the terms to continue.",
        variant: "outline",
    },
};

export const Disabled: Story = {
    args: {
        label: "Airplane mode",
        description: "Disable all wireless connections.",
        disabled: true,
        variant: "outline",
    },
};

export const DisabledChecked: Story = {
    args: {
        label: "Airplane mode",
        description: "Disable all wireless connections.",
        disabled: true,
        defaultChecked: true,
        variant: "outline",
    },
};

export const BareSwitch: Story = {
    name: "Bare switch (no label)",
    args: {
        label: undefined,
        description: undefined,
    },
};

export const BareChecked: Story = {
    name: "Bare switch (checked)",
    args: {
        label: undefined,
        description: undefined,
        defaultChecked: true,
    },
};

export const MultipleSettings: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "24rem" }}>
            <Switch
                label="Email notifications"
                description="Receive updates and announcements via email."
                variant="outline"
                defaultChecked
            />
            <Switch
                label="SMS alerts"
                description="Receive urgent alerts directly on your phone."
                variant="outline"
            />
            <Switch
                label="Marketing emails"
                description="Stay up to date with our latest offers."
                variant="outline"
                disabled
            />
        </div>
    ),
};
