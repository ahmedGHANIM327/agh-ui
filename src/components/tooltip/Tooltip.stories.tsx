import type { Meta, StoryObj } from "@storybook/react-vite";
import Tooltip from "./Tooltip";
import Button from "../button/Button";
import Card from "../card/Card";
import Typography from "../typography/Typography";

const meta: Meta<typeof Tooltip> = {
    title: "Tooltip",
    component: Tooltip,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Tooltip displays contextual information when hovering over an element. Its visual style follows the same compact and clean pattern as shadcn/ui.",
            },
        },
    },
    argTypes: {
        children: {
            control: false,
            description: "Element that triggers the tooltip on hover.",
            table: {
                category: "Content",
                type: { summary: "ReactNode" },
            },
        },

        content: {
            control: "text",
            description: "Text displayed inside the tooltip.",
            table: {
                category: "Content",
                type: { summary: "string" },
            },
        },

        position: {
            control: "select",
            options: ["top", "bottom", "right", "left"],
            description: "Position of the tooltip relative to the trigger.",
            table: {
                category: "Behavior",
                type: { summary: "TooltipPosition" },
                defaultValue: { summary: "top" },
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
    args: {
        content: "This is a tooltip",
        position: "top",
    },
    render: (args) => (
        <Tooltip {...args}>
            <Button label="Hover me" />
        </Tooltip>
    ),
};

export const Positions: Story = {
    render: () => (
        <Card
            style={{
                width: "360px",
                height: "220px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                flexWrap: "wrap",
            }}
        >
            <Tooltip content="Tooltip top" position="top">
                <Button label="Top" />
            </Tooltip>

            <Tooltip content="Tooltip bottom" position="bottom">
                <Button label="Bottom" />
            </Tooltip>

            <Tooltip content="Tooltip left" position="left">
                <Button label="Left" />
            </Tooltip>

            <Tooltip content="Tooltip right" position="right">
                <Button label="Right" />
            </Tooltip>
        </Card>
    ),
};

export const WithText: Story = {
    render: () => (
        <Typography variant="h3">
            Save changes by clicking{" "}
            <Tooltip content="This action updates your profile settings">
                <Typography variant="h3" color="primary">
                    here
                </Typography>
            </Tooltip>
            .
        </Typography>
    ),
};