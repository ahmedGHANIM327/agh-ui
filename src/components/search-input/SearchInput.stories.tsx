import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import SearchInput from "./SearchInput";

const meta: Meta<typeof SearchInput> = {
    title: "SearchInput",
    component: SearchInput,
    tags: ["autodocs"],

    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "SearchInput is a search field with a search icon, a clear button and built-in debounce functionality.",
            },
        },
    },

    args: {
        placeholder: "Search...",
        debounceMs: 500,
    },

    argTypes: {
        placeholder: {
            control: "text",
            description: "Placeholder text displayed inside the search field.",
            table: {
                category: "Content",
                type: {
                    summary: "string",
                },
            },
        },

        label: {
            control: "text",
            description: "Label displayed above the search field.",
            table: {
                category: "Content",
                type: {
                    summary: "string",
                },
            },
        },

        description: {
            control: "text",
            description: "Helper text displayed below the search field.",
            table: {
                category: "Content",
                type: {
                    summary: "string",
                },
            },
        },

        error: {
            control: "text",
            description: "Error message displayed below the search field.",
            table: {
                category: "Validation",
                type: {
                    summary: "string",
                },
            },
        },

        disabled: {
            control: "boolean",
            description: "Disables the search field.",
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

        debounceMs: {
            control: {
                type: "number",
                min: 0,
                step: 50,
            },
            description:
                "Delay in milliseconds before onSearch is called after the user stops typing.",
            table: {
                category: "Behavior",
                type: {
                    summary: "number",
                },
                defaultValue: {
                    summary: "300",
                },
            },
        },

        value: {
            control: "text",
            description: "Controlled value of the search field.",
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
            description:
                "Callback fired immediately when the search value changes.",
            table: {
                category: "Events",
                type: {
                    summary:
                        "(event: ChangeEvent<HTMLInputElement>) => void",
                },
            },
        },

        onSearch: {
            action: "searched",
            description:
                "Callback fired after the debounce delay.",
            table: {
                category: "Events",
                type: {
                    summary: "(value: string) => void",
                },
            },
        },

        onClear: {
            action: "cleared",
            description:
                "Callback fired when the clear button is clicked.",
            table: {
                category: "Events",
                type: {
                    summary: "() => void",
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
            description: "ID of the input element.",
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

type Story = StoryObj<typeof SearchInput>;

/**
 * Interactive playground.
 *
 * Type directly into the search field below to see
 * the debounce effect.
 */
export const Playground: Story = {
    render: (args) => {
        const [value, setValue] = useState("");
        const [debouncedValue, setDebouncedValue] = useState("");

        return (
            <div
                style={{
                    width: "360px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                }}
            >
                <SearchInput
                    {...args}
                    value={value}
                    onChange={(event) => {
                        setValue(event.target.value);
                    }}
                    onSearch={(searchValue) => {
                        setDebouncedValue(searchValue);
                    }}
                />

                <div
                    style={{
                        padding: "12px",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-md)",
                        background: "var(--muted)",
                        fontSize: "14px",
                    }}
                >
                    <div>
                        <strong>Current value:</strong>{" "}
                        {value || "—"}
                    </div>

                    <div style={{ marginTop: "6px" }}>
                        <strong>Debounced value:</strong>{" "}
                        {debouncedValue || "—"}
                    </div>

                    <div
                        style={{
                            marginTop: "10px",
                            color: "var(--muted-foreground)",
                            fontSize: "12px",
                        }}
                    >
                        Type quickly and stop typing to see the
                        debounced value update after{" "}
                        {args.debounceMs}ms.
                    </div>
                </div>
            </div>
        );
    },
};

export const Default: Story = {
    args: {
        placeholder: "Search...",
        debounceMs: 300,
    },
};

export const WithLabel: Story = {
    args: {
        label: "Search users",
        placeholder: "Search by name...",
        description: "Start typing to search users.",
        debounceMs: 500,
    },
};

export const WithDefaultValue: Story = {
    args: {
        placeholder: "Search...",
        defaultValue: "GitHub",
        debounceMs: 500,
    },
};

export const WithError: Story = {
    args: {
        label: "Search",
        placeholder: "Search...",
        error: "Something went wrong while searching.",
        debounceMs: 500,
    },
};

export const Disabled: Story = {
    args: {
        placeholder: "Search...",
        disabled: true,
    },
};

export const CustomDebounce: Story = {
    args: {
        label: "Slow search",
        placeholder: "Type something...",
        debounceMs: 1000,
        description:
            "The search callback is triggered 1 second after you stop typing.",
    },
};
