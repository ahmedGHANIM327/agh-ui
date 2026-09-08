import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, type ComponentProps } from "react";
import Combobox from "./Combobox";

const countries = [
    "France",
    "Germany",
    "Spain",
    "Italy",
    "Belgium",
    "Portugal",
    "Netherlands",
    "Switzerland",
    "Austria",
    "Sweden",
    "Norway",
    "Finland",
    "Denmark",
    "Ireland",
    "Poland",
];

const meta: Meta<typeof Combobox> = {
    title: "Combobox",
    component: Combobox,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Combobox lets users select a single value from a list of options. V0: single-select, `string` options, optional search, full keyboard navigation, and a dedicated portal for the dropdown.",
            },
        },
    },
    args: {
        options: countries,
        label: "Country",
        placeholder: "Select a country",
        description: "Choose your country of residence.",
        searchable: false,
        disabled: false,
        required: false,
    },
    argTypes: {
        options: {
            control: "object",
            description: "List of available options.",
            table: { category: "Content", type: { summary: "string[]" } },
        },
        value: {
            control: "text",
            description: "Controlled selected value.",
            table: { category: "State", type: { summary: "string" } },
        },
        defaultValue: {
            control: "text",
            description: "Uncontrolled initial selected value.",
            table: { category: "State", type: { summary: "string" } },
        },
        placeholder: {
            control: "text",
            description: "Placeholder shown when no value is selected.",
            table: { category: "Content", type: { summary: "string" } },
        },
        label: {
            control: "text",
            description: "Label displayed above the combobox.",
            table: { category: "Content", type: { summary: "string" } },
        },
        description: {
            control: "text",
            description: "Helper text displayed below the combobox.",
            table: { category: "Content", type: { summary: "string" } },
        },
        error: {
            control: "text",
            description: "Error message displayed below the combobox.",
            table: { category: "Validation", type: { summary: "string" } },
        },
        searchable: {
            control: "boolean",
            description: "Enables a search input inside the dropdown.",
            table: { category: "Behavior", type: { summary: "boolean" } },
        },
        disabled: {
            control: "boolean",
            description: "Disables the component.",
            table: { category: "State", type: { summary: "boolean" } },
        },
        required: {
            control: "boolean",
            description: "Marks the field as required.",
            table: { category: "Validation", type: { summary: "boolean" } },
        },
        onValueChange: {
            action: "valueChanged",
            table: { category: "Events" },
        },
    },
    decorators: [
        (Story) => (
            <div style={{ width: 320 }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Default: Story = {};

export const Searchable: Story = {
    args: {
        searchable: true,
        placeholder: "Search a country",
    },
};

export const WithDefaultValue: Story = {
    args: {
        defaultValue: "France",
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        defaultValue: "France",
    },
};

export const Required: Story = {
    args: {
        required: true,
    },
};

export const WithError: Story = {
    args: {
        error: "Please select a country.",
        required: true,
    },
};

export const Controlled: Story = {
    render: (args: ComponentProps<typeof Combobox>) => {
        const [value, setValue] = useState<string | undefined>("Spain");
        return (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Combobox
                    {...args}
                    value={value}
                    onValueChange={setValue}
                />
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 14 }}>
                    Selected: <strong>{value ?? "—"}</strong>
                </p>
            </div>
        );
    },
    args: {
        searchable: true,
    },
};
