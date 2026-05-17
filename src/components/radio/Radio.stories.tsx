import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Radio from "./Radio";

const meta: Meta<typeof Radio> = {
    title: "Radio",
    component: Radio,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Radio is a form control used to select a single option from a group. It supports label, description, error, disabled and controlled states.",
            },
        },
    },
    args: {
        label: "Email",
        name: "notification",
        value: "email",
    },
    argTypes: {
        label: {
            control: "text",
            description: "Label displayed next to the radio input.",
            table: {
                category: "Content",
                type: {
                    summary: "string",
                },
            },
        },

        description: {
            control: "text",
            description: "Helper text displayed below the radio label.",
            table: {
                category: "Content",
                type: {
                    summary: "string",
                },
            },
        },

        error: {
            control: "text",
            description: "Error message displayed below the radio label.",
            table: {
                category: "Validation",
                type: {
                    summary: "string",
                },
            },
        },

        checked: {
            control: "boolean",
            description: "Controls whether the radio is selected.",
            table: {
                category: "State",
                type: {
                    summary: "boolean",
                },
            },
        },

        disabled: {
            control: "boolean",
            description: "Disables the radio input.",
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

        name: {
            control: "text",
            description:
                "Name attribute used to group related radio inputs together.",
            table: {
                category: "HTML Attributes",
                type: {
                    summary: "string",
                },
            },
        },

        value: {
            control: "text",
            description: "Value submitted when the radio is selected.",
            table: {
                category: "HTML Attributes",
                type: {
                    summary: "string | number | readonly string[]",
                },
            },
        },

        id: {
            control: "text",
            description:
                "ID of the radio input. If not provided, it is generated from name and value.",
            table: {
                category: "HTML Attributes",
                type: {
                    summary: "string",
                },
            },
        },

        onChange: {
            action: "changed",
            description: "Callback fired when the radio value changes.",
            table: {
                category: "Events",
                type: {
                    summary: "(event: ChangeEvent<HTMLInputElement>) => void",
                },
            },
        },

        className: {
            control: false,
            description: "Custom class applied to the native radio input.",
            table: {
                category: "Styling",
                type: {
                    summary: "string",
                },
            },
        },

        containerClassName: {
            control: false,
            description: "Custom class applied to the radio container.",
            table: {
                category: "Styling",
                type: {
                    summary: "string",
                },
            },
        },

        labelClassName: {
            control: false,
            description: "Custom class applied to the label text.",
            table: {
                category: "Styling",
                type: {
                    summary: "string",
                },
            },
        },

        descriptionClassName: {
            control: false,
            description: "Custom class applied to the description text.",
            table: {
                category: "Styling",
                type: {
                    summary: "string",
                },
            },
        },

        errorClassName: {
            control: false,
            description: "Custom class applied to the error message.",
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

type Story = StoryObj<typeof Radio>;

export const Playground: Story = {};

export const Default: Story = {
    args: {
        label: "Email",
        name: "notification",
        value: "email",
    },
};

export const Checked: Story = {
    args: {
        label: "Email",
        name: "notification",
        value: "email",
        checked: true,
        readOnly: true,
    },
};

export const WithDescription: Story = {
    args: {
        label: "Email",
        description: "Receive notifications by email.",
        name: "notification",
        value: "email",
    },
};

export const WithError: Story = {
    args: {
        label: "Email",
        error: "This option is not available.",
        name: "notification",
        value: "email",
    },
};

export const Disabled: Story = {
    args: {
        label: "Disabled option",
        name: "notification",
        value: "disabled",
        disabled: true,
    },
};

export const DisabledChecked: Story = {
    args: {
        label: "Disabled checked option",
        name: "notification",
        value: "disabled-checked",
        checked: true,
        disabled: true,
        readOnly: true,
    },
};

export const Controlled: Story = {
    render: () => {
        const [value, setValue] = useState("email");

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <Radio
                    label="Email"
                    description="Receive notifications by email."
                    name="controlled-notification"
                    value="email"
                    checked={value === "email"}
                    onChange={(event) => setValue(event.target.value)}
                />

                <Radio
                    label="SMS"
                    description="Receive notifications by SMS."
                    name="controlled-notification"
                    value="sms"
                    checked={value === "sms"}
                    onChange={(event) => setValue(event.target.value)}
                />

                <Radio
                    label="Push"
                    description="Receive notifications in the app."
                    name="controlled-notification"
                    value="push"
                    checked={value === "push"}
                    onChange={(event) => setValue(event.target.value)}
                />
            </div>
        );
    },
};