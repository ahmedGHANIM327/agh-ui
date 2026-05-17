import type { Meta, StoryObj } from "@storybook/react-vite";
import Card from "./Card";
import Typography from "../typography/Typography";
import Button from "../button/Button";

const meta: Meta<typeof Card> = {
    title: "Card",
    component: Card,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Card is a flexible container used to group related content and actions. It provides consistent spacing, border, radius and shadow based on the design system tokens.",
            },
        },
    },
    argTypes: {
        children: {
            control: false,
            description: "Content rendered inside the card.",
            table: {
                category: "Content",
                type: { summary: "ReactNode" },
            },
        },

        className: {
            control: false,
            description: "Custom class applied to the card container.",
            table: {
                category: "Styling",
                type: { summary: "string" },
            },
        },

        style: {
            control: false,
            description: "Inline styles applied to the card container.",
            table: {
                category: "Styling",
                type: { summary: "CSSProperties" },
            },
        },

        onClick: {
            action: "clicked",
            description: "Callback fired when the card is clicked.",
            table: {
                category: "Events",
                type: { summary: "(event: MouseEvent<HTMLDivElement>) => void" },
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
    render: () => (
        <Card style={{ width: "400px" }}>
            <Typography variant="p-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto magni molestiae nemo dignissimos.
            </Typography>
        </Card>
    ),
};

export const WithContent: Story = {
    render: () => (
        <Card
            style={{
                width: "400px",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}
        >
            <Typography variant="h3" color="primary">
                Dashboard
            </Typography>

            <Typography variant="p">
                Manage your account and preferences.
            </Typography>
        </Card>
    ),
};

export const WithActions: Story = {
    render: () => (
        <Card
            style={{
                width: "400px",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}
        >
            <Typography variant="h3">
                Delete project
            </Typography>

            <Typography variant="p-sm" color="muted">
                This action cannot be undone. This will permanently delete your project.
            </Typography>

            <div
                style={{
                    display: "flex",
                    gap: "0.75rem",
                    justifyContent: "flex-end",
                }}
            >
                <Button label="Cancel" variant="outline" />
                <Button label="Delete" variant="destructive" />
            </div>
        </Card>
    ),
};

export const Interactive: Story = {
    render: () => (
        <Card
            role="button"
            tabIndex={0}
            style={{
                width: "400px",
                cursor: "pointer",
            }}
            onClick={() => alert("Card clicked")}
        >
            <Typography variant="h4">
                Clickable card
            </Typography>

            <Typography variant="p-sm" color="muted">
                This example shows how a card can behave as an interactive container.
            </Typography>
        </Card>
    ),
};

export const CompactContent: Story = {
    render: () => (
        <Card
            style={{
                width: "320px",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
            }}
        >
            <Typography variant="label">
                Total revenue
            </Typography>

            <Typography variant="h2" color="primary">
                €12,450
            </Typography>

            <Typography variant="p-xs" color="muted">
                +12% compared to last month
            </Typography>
        </Card>
    ),
};