import type { Meta, StoryObj } from "@storybook/react-vite";
import Input from "./Input";

const meta: Meta<typeof Input> = {
    title: "Input",
    component: Input,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Input is a form component used to collect single-line user input. It supports labels, descriptions, validation states, password visibility toggle and loading states.",
            },
        },
    },

    args: {
        label: "Username",
        placeholder: "Enter your username",
        description: "Your username must be unique.",
        type: "text",
    },

    argTypes: {
        type: {
            control: "select",
            options: [
                "text",
                "password",
                "email",
                "number",
                "date",
                "datetime-local",
                "month",
                "search",
                "tel",
                "time",
                "url",
                "week",
            ],
            description: "Defines the input type.",
            table: {
                category: "HTML Attributes",
                type: {
                    summary:
                        `"text" | "password" | "email" | "number" | "date" | "datetime-local" | "month" | "search" | "tel" | "time" | "url" | "week"`,
                },
                defaultValue: {
                    summary: "text",
                },
            },
        },

        label: {
            control: "text",
            description: "Label displayed above the input field.",
            table: {
                category: "Content",
                type: {
                    summary: "string",
                },
            },
        },

        placeholder: {
            control: "text",
            description: "Placeholder text displayed inside the input.",
            table: {
                category: "Content",
                type: {
                    summary: "string",
                },
            },
        },

        description: {
            control: "text",
            description: "Helper text displayed below the input.",
            table: {
                category: "Content",
                type: {
                    summary: "string",
                },
            },
        },

        error: {
            control: "text",
            description: "Error message displayed below the input.",
            table: {
                category: "Validation",
                type: {
                    summary: "string",
                },
            },
        },

        disabled: {
            control: "boolean",
            description: "Disables the input field.",
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
            description: "Controlled value of the input.",
            table: {
                category: "State",
                type: {
                    summary: "string",
                },
            },
        },

        defaultValue: {
            control: "text",
            description: "Initial value for uncontrolled usage.",
            table: {
                category: "State",
                type: {
                    summary: "string",
                },
            },
        },

        onChange: {
            action: "changed",
            description: "Callback fired when the input value changes.",
            table: {
                category: "Events",
                type: {
                    summary: "(event: ChangeEvent<HTMLInputElement>) => void",
                },
            },
        },

        name: {
            control: "text",
            description: "Name attribute of the input element.",
            table: {
                category: "HTML Attributes",
                type: {
                    summary: "string",
                },
            },
        },

        id: {
            control: "text",
            description:
                "ID of the input element used to associate the label.",
            table: {
                category: "HTML Attributes",
                type: {
                    summary: "string",
                },
            },
        },

        className: {
            control: false,
            description: "Custom class applied to the input element.",
            table: {
                category: "Styling",
                type: {
                    summary: "string",
                },
            },
        },

        containerClassName: {
            control: false,
            description: "Custom class applied to the input container.",
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

type Story = StoryObj<typeof Input>;

export const Playground: Story = {};

export const Default: Story = {
    args: {
        label: "Username",
        placeholder: "Enter your username",
        description: "Your username must be unique.",
        type: "text",
    },
};

export const Password: Story = {
    args: {
        label: "Password",
        placeholder: "Enter your password",
        description: "Minimum 8 characters required.",
        type: "password",
    },
};

export const WithError: Story = {
    args: {
        label: "Email",
        placeholder: "Enter your email",
        error: "Email address is required.",
        type: "email",
    },
};

export const Disabled: Story = {
    args: {
        label: "Username",
        placeholder: "Disabled input",
        description: "This field cannot be edited.",
        disabled: true,
    },
};

export const Loading: Story = {
    args: {
        label: "Searching",
        placeholder: "Searching...",
        description: "Please wait while loading data.",
    },
};

export const WithDefaultValue: Story = {
    args: {
        label: "First name",
        defaultValue: "Ahmed",
        description: "Input with an initial value.",
    },
};

export const DifferentTypes: Story = {
    render: () => (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}
        >
            <Input
                label="Email"
                type="email"
                placeholder="john@example.com"
            />

            <Input
                label="Phone"
                type="tel"
                placeholder="+33 6 00 00 00 00"
            />

            <Input
                label="Website"
                type="url"
                placeholder="https://example.com"
            />

            <Input
                label="Search"
                type="search"
                placeholder="Search..."
            />
        </div>
    ),
};

export const InsideCard: Story = {
    render: () => (
        <Input
            label="Email address"
            placeholder="john@example.com"
            description="We'll never share your email."
            type="email"
        />
    ),
};