import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import CheckboxGroup from "./CheckboxGroup";

const options = [
    {
        value: "email",
        label: "Email",
        description: "Receive notifications by email.",
    },
    {
        value: "sms",
        label: "SMS",
        description: "Receive notifications by SMS.",
    },
    {
        value: "push",
        label: "Push notifications",
        description: "Receive notifications in the app.",
    },
];

const meta: Meta<typeof CheckboxGroup> = {
    title: "CheckboxGroup",
    component: CheckboxGroup,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "CheckboxGroup is used to render multiple checkbox options and allow users to select one or more values from a list.",
            },
        },
    },
    args: {
        label: "Notifications",
        description: "Choose how you want to be notified.",
        name: "notifications",
        options,
    },
    argTypes: {
        label: {
            control: "text",
            description: "Label displayed above the checkbox group.",
            table: {
                category: "Content",
                type: { summary: "string" },
            },
        },
        description: {
            control: "text",
            description: "Helper text displayed below the group label.",
            table: {
                category: "Content",
                type: { summary: "string" },
            },
        },
        error: {
            control: "text",
            description: "Error message displayed below the group label.",
            table: {
                category: "Validation",
                type: { summary: "string" },
            },
        },
        options: {
            control: "object",
            description: "List of checkbox options rendered inside the group.",
            table: {
                category: "Data",
                type: {
                    summary: "CheckboxOption[]",
                    detail: "{ value: string; label: string; description?: string; disabled?: boolean }[]",
                },
            },
        },
        value: {
            control: "object",
            description: "Controlled selected values.",
            table: {
                category: "State",
                type: { summary: "string[]" },
            },
        },
        onChange: {
            action: "changed",
            description: "Callback fired when selected values change.",
            table: {
                category: "Events",
                type: { summary: "(value: string[]) => void" },
            },
        },
        disabled: {
            control: "boolean",
            description: "Disables all checkbox options in the group.",
            table: {
                category: "State",
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        name: {
            control: "text",
            description: "Name shared by all checkbox inputs in the group.",
            table: {
                category: "HTML Attributes",
                type: { summary: "string" },
            },
        },
        className: {
            control: false,
            description: "Custom class applied to the checkbox group items wrapper.",
            table: {
                category: "Styling",
                type: { summary: "string" },
            },
        },
        containerClassName: {
            control: false,
            description: "Custom class applied to the checkbox group fieldset.",
            table: {
                category: "Styling",
                type: { summary: "string" },
            },
        },
        labelClassName: {
            control: false,
            description: "Custom class applied to the group label.",
            table: {
                category: "Styling",
                type: { summary: "string" },
            },
        },
        descriptionClassName: {
            control: false,
            description: "Custom class applied to the group description.",
            table: {
                category: "Styling",
                type: { summary: "string" },
            },
        },
        errorClassName: {
            control: false,
            description: "Custom class applied to the group error message.",
            table: {
                category: "Styling",
                type: { summary: "string" },
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof CheckboxGroup>;

export const Playground: Story = {
    render: (args) => {
        const [value, setValue] = useState<string[]>([]);

        return (
            <div style={{ width: "380px" }}>
                <CheckboxGroup
                    {...args}
                    value={value}
                    onChange={setValue}
                />
            </div>
        );
    },
};

export const Default: Story = {
    render: () => {
        const [value, setValue] = useState<string[]>(["email"]);

        return (
            <div style={{ width: "380px" }}>
                <CheckboxGroup
                    label="Notifications"
                    description="Choose how you want to be notified."
                    name="notifications"
                    value={value}
                    onChange={setValue}
                    options={options}
                />
            </div>
        );
    },
};

export const WithDefaultValues: Story = {
    render: () => {
        const [value, setValue] = useState<string[]>(["email", "push"]);

        return (
            <div style={{ width: "380px" }}>
                <CheckboxGroup
                    label="Notifications"
                    description="Email and push notifications are selected by default."
                    name="notifications-default"
                    value={value}
                    onChange={setValue}
                    options={options}
                />
            </div>
        );
    },
};

export const WithDisabledOption: Story = {
    render: () => {
        const [value, setValue] = useState<string[]>(["email"]);

        return (
            <div style={{ width: "380px" }}>
                <CheckboxGroup
                    label="Notifications"
                    description="Some options can be disabled."
                    name="notifications-disabled-option"
                    value={value}
                    onChange={setValue}
                    options={[
                        {
                            value: "email",
                            label: "Email",
                            description: "Receive notifications by email.",
                        },
                        {
                            value: "sms",
                            label: "SMS",
                            description: "This option is currently unavailable.",
                            disabled: true,
                        },
                        {
                            value: "push",
                            label: "Push notifications",
                            description: "Receive notifications in the app.",
                        },
                    ]}
                />
            </div>
        );
    },
};

export const WithError: Story = {
    render: () => {
        const [value, setValue] = useState<string[]>([]);

        return (
            <div style={{ width: "380px" }}>
                <CheckboxGroup
                    label="Preferences"
                    error="Please select at least one option."
                    name="preferences"
                    value={value}
                    onChange={setValue}
                    options={[
                        {
                            value: "analytics",
                            label: "Analytics",
                        },
                        {
                            value: "marketing",
                            label: "Marketing",
                        },
                    ]}
                />
            </div>
        );
    },
};

export const Disabled: Story = {
    render: () => {
        const [value, setValue] = useState<string[]>(["email"]);

        return (
            <div style={{ width: "380px" }}>
                <CheckboxGroup
                    label="Notifications"
                    description="This group is disabled."
                    name="notifications-disabled"
                    value={value}
                    onChange={setValue}
                    disabled
                    options={options}
                />
            </div>
        );
    },
};