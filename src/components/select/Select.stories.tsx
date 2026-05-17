import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Select from "./Select";

const options = [
    {
        label: "France",
        value: "fr",
    },
    {
        label: "Belgique",
        value: "be",
    },
    {
        label: "Suisse",
        value: "ch",
    },
];

const meta: Meta<typeof Select> = {
    title: "Select",
    component: Select,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Select is a form component used to let users choose one option from a predefined list. It supports label, placeholder, description, error and disabled states.",
            },
        },
    },
    args: {
        label: "Pays",
        placeholder: "Sélectionner un pays",
        description: "Choisissez votre pays de résidence.",
        options,
    },
    argTypes: {
        label: {
            control: "text",
            description: "Label displayed above the select field.",
            table: {
                category: "Content",
                type: {
                    summary: "string",
                },
            },
        },

        placeholder: {
            control: "text",
            description: "Placeholder option displayed before a value is selected.",
            table: {
                category: "Content",
                type: {
                    summary: "string",
                },
            },
        },

        description: {
            control: "text",
            description: "Helper text displayed below the select field.",
            table: {
                category: "Content",
                type: {
                    summary: "string",
                },
            },
        },

        error: {
            control: "text",
            description: "Error message displayed below the select field.",
            table: {
                category: "Validation",
                type: {
                    summary: "string",
                },
            },
        },

        options: {
            control: "object",
            description: "List of options displayed inside the select.",
            table: {
                category: "Data",
                type: {
                    summary: "SelectOption[]",
                    detail: "{ label: string; value: string; disabled?: boolean }[]",
                },
            },
        },

        disabled: {
            control: "boolean",
            description: "Disables the select field.",
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

        isLoading: {
            control: "boolean",
            description: "Select options are in loading state.",
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

        value: {
            control: "text",
            description: "Controlled selected value.",
            table: {
                category: "State",
                type: {
                    summary: "string",
                },
            },
        },

        defaultValue: {
            control: "text",
            description: "Initial selected value for uncontrolled usage.",
            table: {
                category: "State",
                type: {
                    summary: "string",
                },
            },
        },

        onChange: {
            action: "changed",
            description: "Callback fired when the selected value changes.",
            table: {
                category: "Events",
                type: {
                    summary: "(event: ChangeEvent<HTMLSelectElement>) => void",
                },
            },
        },

        name: {
            control: "text",
            description: "Name attribute of the select element.",
            table: {
                category: "HTML Attributes",
                type: {
                    summary: "string",
                },
            },
        },

        id: {
            control: "text",
            description: "ID of the select element. Used to associate the label with the field.",
            table: {
                category: "HTML Attributes",
                type: {
                    summary: "string",
                },
            },
        },

        className: {
            control: false,
            description: "Custom class applied to the select element.",
            table: {
                category: "Styling",
                type: {
                    summary: "string",
                },
            },
        },

        containerClassName: {
            control: false,
            description: "Custom class applied to the select container.",
            table: {
                category: "Styling",
                type: {
                    summary: "string",
                },
            },
        },

        labelClassName: {
            control: false,
            description: "Custom class applied to the label element.",
            table: {
                category: "Styling",
                type: {
                    summary: "string",
                },
            },
        },

        descriptionClassName: {
            control: false,
            description: "Custom class applied to the description element.",
            table: {
                category: "Styling",
                type: {
                    summary: "string",
                },
            },
        },

        errorClassName: {
            control: false,
            description: "Custom class applied to the error message element.",
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

type Story = StoryObj<typeof Select>;

export const Playground: Story = {};

export const Default: Story = {
    args: {
        label: "Pays",
        placeholder: "Sélectionner un pays",
        options,
    },
};

export const WithDescription: Story = {
    args: {
        label: "Pays",
        description: "Choisissez votre pays de résidence.",
        placeholder: "Sélectionner un pays",
        options,
    },
};

export const WithError: Story = {
    args: {
        label: "Pays",
        error: "Le pays est obligatoire.",
        placeholder: "Sélectionner un pays",
        options,
    },
};

export const Disabled: Story = {
    args: {
        label: "Pays",
        placeholder: "Sélectionner un pays",
        disabled: true,
        options,
    },
};

export const WithDisabledOption: Story = {
    args: {
        label: "Pays",
        placeholder: "Sélectionner un pays",
        description: "Certaines options peuvent être désactivées.",
        options: [
            {
                label: "France",
                value: "fr",
            },
            {
                label: "Belgique",
                value: "be",
                disabled: true,
            },
            {
                label: "Suisse",
                value: "ch",
            },
        ],
    },
};

export const WithDefaultValue: Story = {
    args: {
        label: "Pays",
        description: "Exemple avec une valeur initiale.",
        defaultValue: "fr",
        options,
    },
};

export const Controlled: Story = {
    render: () => {
        const [value, setValue] = useState("");

        return (
            <Select
                label="Pays"
                placeholder="Sélectionner un pays"
                description={`Valeur sélectionnée : ${value || "aucune"}`}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                options={options}
            />
        );
    },
};