import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import RadioGroup from "./RadioGroup";

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

const meta: Meta<typeof RadioGroup> = {
    title: "RadioGroup",
    component: RadioGroup,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "RadioGroup is used to group multiple radio options and allow users to select exactly one value from a list.",
            },
        },
    },
    args: {
        label: "Notifications",
        description: "Choose your preferred notification channel.",
        name: "notifications",
        options,
    },
    argTypes: {
        label: {
            control: "text",
            description: "Label displayed above the radio group.",
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
            description: "List of radio options rendered inside the group.",
            table: {
                category: "Data",
                type: {
                    summary: "RadioOption[]",
                    detail: "{ value: string; label: string; description?: string; disabled?: boolean }[]",
                },
            },
        },

        value: {
            control: "text",
            description: "Controlled selected value.",
            table: {
                category: "State",
                type: { summary: "string" },
            },
        },

        onChange: {
            action: "changed",
            description: "Callback fired when the selected value changes.",
            table: {
                category: "Events",
                type: { summary: "(value: string) => void" },
            },
        },

        disabled: {
            control: "boolean",
            description: "Disables all radio options in the group.",
            table: {
                category: "State",
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },

        name: {
            control: "text",
            description: "Name shared by all radio inputs in the group.",
            table: {
                category: "HTML Attributes",
                type: { summary: "string" },
            },
        },

        className: {
            control: false,
            description: "Custom class applied to the radio group items wrapper.",
            table: {
                category: "Styling",
                type: { summary: "string" },
            },
        },

        containerClassName: {
            control: false,
            description: "Custom class applied to the radio group fieldset.",
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

type Story = StoryObj<typeof RadioGroup>;

export const Playground: Story = {
    render: (args) => {
        const [value, setValue] = useState<string>("");

        return (
            <RadioGroup
                {...args}
                value={value}
                onChange={setValue}
            />
        );
    },
};

export const Default: Story = {
    render: () => {
        const [value, setValue] = useState<string>("");

        return (
            <RadioGroup
                label="Notifications"
                description="Choose your preferred notification channel."
                name="notifications"
                value={value}
                onChange={setValue}
                options={options}
            />
        );
    },
};

export const WithDefaultValue: Story = {
    render: () => {
        const [value, setValue] = useState<string>("email");

        return (
            <RadioGroup
                label="Notifications"
                description="Email is selected by default."
                name="notifications-default"
                value={value}
                onChange={setValue}
                options={options}
            />
        );
    },
};

export const WithDisabledOption: Story = {
    render: () => {
        const [value, setValue] = useState<string>("");

        return (
            <RadioGroup
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
        );
    },
};

export const Error: Story = {
    render: () => {
        const [value, setValue] = useState<string>("");

        return (
            <RadioGroup
                label="Payment method"
                error="Please select a payment method."
                name="payment"
                value={value}
                onChange={setValue}
                options={[
                    {
                        value: "card",
                        label: "Credit card",
                    },
                    {
                        value: "paypal",
                        label: "PayPal",
                    },
                ]}
            />
        );
    },
};

export const Disabled: Story = {
    render: () => {
        const [value, setValue] = useState<string>("email");

        return (
            <RadioGroup
                label="Notifications"
                description="This group is disabled."
                name="notifications-disabled"
                value={value}
                onChange={setValue}
                disabled
                options={options}
            />
        );
    },
};