import type { Meta, StoryObj } from "@storybook/react-vite";
import Textarea from "./Textarea";

const meta: Meta<typeof Textarea> = {
    title: "Textarea",
    component: Textarea,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Textarea is a form component used for multi-line text input. It supports label, description, error and disabled states.",
            },
        },
    },
    args: {
        label: "Description",
        placeholder: "Entrez une description",
        description: "Ajoutez une description détaillée.",
    },
    argTypes: {
        label: {
            control: "text",
            description: "Label displayed above the textarea.",
        },
        placeholder: {
            control: "text",
            description: "Placeholder text displayed inside the textarea.",
        },
        description: {
            control: "text",
            description: "Helper text displayed below the textarea.",
        },
        error: {
            control: "text",
            description: "Error message displayed below the textarea.",
        },
        disabled: {
            control: "boolean",
            description: "Disables the textarea.",
        },
        rows: {
            control: "number",
            description: "Number of visible text lines.",
        },
        className: {
            control: "text",
            description: "Custom class applied to the textarea element.",
            table: {
                category: "Styling",
                type: {
                    summary: "string",
                },
            },
        },

        containerClassName: {
            control: "text",
            description: "Custom class applied to the textarea container.",
            table: {
                category: "Styling",
                type: {
                    summary: "string",
                },
            },
        },

        labelClassName: {
            control: "text",
            description: "Custom class applied to the label element.",
            table: {
                category: "Styling",
                type: {
                    summary: "string",
                },
            },
        },

        descriptionClassName: {
            control: "text",
            description: "Custom class applied to the description element.",
            table: {
                category: "Styling",
                type: {
                    summary: "string",
                },
            },
        },

        errorClassName: {
            control: "text",
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

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
    args: {
        label: "Description",
        placeholder: "Entrez une description",
        description: "Une description détaillée de votre projet.",
    },
};

export const WithoutLabel: Story = {
    args: {
        label: "",
        placeholder: "Écrire un commentaire...",
        description: "Le label peut être masqué si le contexte est évident.",
    },
};

export const WithError: Story = {
    args: {
        label: "Description",
        placeholder: "Entrez une description",
        error: "La description est obligatoire.",
        description: undefined,
    },
};

export const Disabled: Story = {
    args: {
        label: "Description",
        placeholder: "Champ désactivé",
        description: "Ce champ ne peut pas être modifié.",
        disabled: true,
    },
};

export const WithCustomRows: Story = {
    args: {
        label: "Message",
        placeholder: "Écrivez votre message...",
        description: "Textarea avec plus de lignes visibles.",
        rows: 6,
    },
};

export const LongContent: Story = {
    args: {
        label: "Notes",
        defaultValue:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
        description: "Exemple avec une valeur initiale.",
        rows: 5,
    },
};