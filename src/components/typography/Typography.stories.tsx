import type { Meta, StoryObj } from "@storybook/react-vite";
import Typography from "./Typography";

const meta: Meta<typeof Typography> = {
    title: "Typography",
    component: Typography,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Typography is a foundational component used to render consistent text styles across the design system. It supports headings, paragraphs, labels and semantic color variants.",
            },
        },
    },
    args: {
        variant: "p",
        color: "default",
        children: "The quick brown fox jumps over the lazy dog.",
    },
    argTypes: {
        variant: {
            control: "select",
            options: [
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6",
                "p",
                "p-sm",
                "p-xs",
                "label",
            ],
            description: "Defines the typography style and default semantic HTML element.",
            table: {
                category: "Appearance",
                type: {
                    summary:
                        `"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "p-sm" | "p-xs" | "label"`,
                },
                defaultValue: {
                    summary: "p",
                },
            },
        },

        color: {
            control: "select",
            options: ["default", "muted", "primary", "destructive"],
            description: "Defines the text color using semantic design tokens.",
            table: {
                category: "Appearance",
                type: {
                    summary: `"default" | "muted" | "primary" | "destructive"`,
                },
                defaultValue: {
                    summary: "default",
                },
            },
        },

        children: {
            control: "text",
            description: "Text content rendered inside the typography component.",
            table: {
                category: "Content",
                type: {
                    summary: "ReactNode",
                },
            },
        },

        className: {
            control: false,
            description: "Custom class applied to the root typography element.",
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

type Story = StoryObj<typeof Typography>;

export const Playground: Story = {};

export const Headings: Story = {
    render: () => (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}
        >
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="h4">Heading 4</Typography>
            <Typography variant="h5">Heading 5</Typography>
            <Typography variant="h6">Heading 6</Typography>
        </div>
    ),
};

export const Paragraphs: Story = {
    render: () => (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                maxWidth: "520px",
            }}
        >
            <Typography variant="p">
                Base paragraph used for regular body content inside pages, cards and forms.
            </Typography>

            <Typography variant="p-sm">
                Small paragraph used for secondary content, helper text or compact layouts.
            </Typography>

            <Typography variant="p-xs">
                Extra small paragraph used for metadata, hints or very compact information.
            </Typography>
        </div>
    ),
};

export const Label: Story = {
    render: () => (
        <Typography variant="label">
            Email address
        </Typography>
    ),
};

export const Colors: Story = {
    render: () => (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}
        >
            <Typography color="default">
                Default text color
            </Typography>

            <Typography color="muted">
                Muted text color
            </Typography>

            <Typography color="primary">
                Primary text color
            </Typography>

            <Typography color="destructive">
                Destructive text color
            </Typography>
        </div>
    ),
};

export const AllVariants: Story = {
    render: () => (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}
        >
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="h4">Heading 4</Typography>
            <Typography variant="h5">Heading 5</Typography>
            <Typography variant="h6">Heading 6</Typography>

            <Typography variant="p">
                This is a paragraph used for regular content.
            </Typography>

            <Typography variant="p-sm">
                This is a small paragraph used for secondary content.
            </Typography>

            <Typography variant="p-xs">
                This is an extra small paragraph used for metadata.
            </Typography>

            <Typography variant="label">
                Email address
            </Typography>

            <Typography variant="p-sm" color="muted">
                Last updated 2 minutes ago
            </Typography>

            <Typography variant="label" color="destructive">
                Email is required
            </Typography>
        </div>
    ),
};