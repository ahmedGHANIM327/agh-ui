import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Checkbox from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
    title: "Checkbox",
    component: Checkbox,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Checkbox is a form control used to allow users to select one or more options. It supports label, description, error, disabled and controlled states.",
            },
        },
    },
    args: {
        label: "Accept terms",
    },
    argTypes: {
        label: {
            control: "text",
            description: "Label displayed next to the checkbox.",
            table: {
                category: "Content",
                type: { summary: "string" },
            },
        },
        description: {
            control: "text",
            description: "Helper text displayed below the checkbox label.",
            table: {
                category: "Content",
                type: { summary: "string" },
            },
        },
        error: {
            control: "text",
            description: "Error message displayed below the checkbox label.",
            table: {
                category: "Validation",
                type: { summary: "string" },
            },
        },
        checked: {
            control: "boolean",
            description: "Controls whether the checkbox is checked.",
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
        disabled: {
            control: "boolean",
            description: "Disables the checkbox.",
            table: {
                category: "State",
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        name: {
            control: "text",
            description: "Name attribute of the checkbox input.",
            table: {
                category: "HTML Attributes",
                type: { summary: "string" },
            },
        },
        value: {
            control: "text",
            description: "Value submitted when the checkbox is checked.",
            table: {
                category: "HTML Attributes",
                type: { summary: "string | number | readonly string[]" },
            },
        },
        id: {
            control: "text",
            description:
                "ID of the checkbox input. Used to associate the label with the field.",
            table: {
                category: "HTML Attributes",
                type: { summary: "string" },
            },
        },
        onChange: {
            action: "changed",
            description: "Callback fired when the checkbox state changes.",
            table: {
                category: "Events",
                type: {
                    summary: "(event: ChangeEvent<HTMLInputElement>) => void",
                },
            },
        },
        className: {
            control: false,
            description: "Custom class applied to the native checkbox input.",
            table: {
                category: "Styling",
                type: { summary: "string" },
            },
        },
        containerClassName: {
            control: false,
            description: "Custom class applied to the checkbox container.",
            table: {
                category: "Styling",
                type: { summary: "string" },
            },
        },
        labelClassName: {
            control: false,
            description: "Custom class applied to the label text.",
            table: {
                category: "Styling",
                type: { summary: "string" },
            },
        },
        descriptionClassName: {
            control: false,
            description: "Custom class applied to the description text.",
            table: {
                category: "Styling",
                type: { summary: "string" },
            },
        },
        errorClassName: {
            control: false,
            description: "Custom class applied to the error message.",
            table: {
                category: "Styling",
                type: { summary: "string" },
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {};

export const Default: Story = {
    args: {
        label: "Accept terms",
    },
};

export const Checked: Story = {
    args: {
        label: "Accept terms",
        checked: true,
        readOnly: true,
    },
};

export const WithDescription: Story = {
    args: {
        label: "Marketing emails",
        description: "Receive updates about new features and offers.",
    },
};

export const WithError: Story = {
    args: {
        label: "Accept terms",
        error: "This field is required.",
    },
};

export const Disabled: Story = {
    args: {
        label: "Disabled checkbox",
        disabled: true,
    },
};

export const DisabledChecked: Story = {
    args: {
        label: "Disabled checked checkbox",
        checked: true,
        disabled: true,
        readOnly: true,
    },
};

export const Controlled: Story = {
    render: () => {
        const [checked, setChecked] = useState(false);

        return (
            <Checkbox
                label="Controlled checkbox"
                description={`Current state: ${checked ? "checked" : "unchecked"}`}
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
            />
        );
    },
};