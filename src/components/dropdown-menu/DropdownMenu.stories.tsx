import type { Meta, StoryObj } from "@storybook/react-vite";
import DropdownMenu from "./DropdownMenu";
import Button from "../button/Button";
import Card from "../card/Card";

const meta: Meta<typeof DropdownMenu> = {
    title: "DropdownMenu",
    component: DropdownMenu,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "DropdownMenu displays a list of actions in its own portal when clicking the trigger. It closes on outside click or Escape. Async items keep the menu open until their promise settles.",
            },
        },
    },
    argTypes: {
        trigger: {
            control: false,
            description: "Element that toggles the menu on click.",
            table: { category: "Content", type: { summary: "ReactNode" } },
        },
        items: {
            control: false,
            description:
                "Menu entries: items (label, leftIcon, rightIcon, disabled, variant, onClick), separators and group labels.",
            table: { category: "Content", type: { summary: "DropdownMenuEntry[]" } },
        },
        position: {
            control: "select",
            options: ["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "center"],
            description: "Position of the menu relative to the trigger.",
            table: {
                category: "Behavior",
                type: { summary: "DropdownMenuPosition" },
                defaultValue: { summary: "bottom" },
            },
        },
        isOpen: {
            control: false,
            description: "Controlled open state.",
            table: { category: "Behavior", type: { summary: "boolean" } },
        },
        onOpenChange: {
            control: false,
            description: "Called when the open state should change.",
            table: { category: "Behavior", type: { summary: "(open: boolean) => void" } },
        },
        closeOnEsc: {
            control: "boolean",
            description: "Close the menu when pressing Escape.",
            table: {
                category: "Behavior",
                type: { summary: "boolean" },
                defaultValue: { summary: "true" },
            },
        },
        contentClassName: {
            control: "text",
            description: "Additional class for the menu content.",
            table: { category: "Style", type: { summary: "string" } },
        },
    },
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const Default: Story = {
    args: {
        position: "bottom",
        items: [
            { label: "Profile", leftIcon: "user" },
            { label: "Settings", leftIcon: "settings", rightIcon: "check" },
            { label: "Disabled", leftIcon: "lock", disabled: true },
        ],
    },
    render: (args) => (
        <DropdownMenu {...args} trigger={<Button label="Open menu" variant="outline" />} />
    ),
};

export const Positions: Story = {
    render: () => (
        <Card
            style={{
                width: "520px",
                height: "320px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                flexWrap: "wrap",
            }}
        >
            {(["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end", "center"] as const).map((position) => (
                <DropdownMenu
                    key={position}
                    position={position}
                    trigger={<Button label={position} variant="outline" />}
                    items={[{ label: "Edit", leftIcon: "edit" }, { label: "Copy", leftIcon: "copy" }]}
                />
            ))}
        </Card>
    ),
};

export const VariantsAndGroups: Story = {
    render: () => (
        <DropdownMenu
            trigger={<Button label="Actions" />}
            items={[
                { type: "label", label: "General" },
                { label: "Default", leftIcon: "edit" },
                { label: "Primary", leftIcon: "save", variant: "primary" },
                { label: "Secondary", leftIcon: "archive", variant: "secondary" },
                { type: "separator" },
                { type: "label", label: "Danger zone" },
                { label: "Delete", leftIcon: "trash", variant: "danger" },
            ]}
        />
    ),
};

export const AsyncItem: Story = {
    render: () => (
        <DropdownMenu
            trigger={<Button label="Async actions" variant="outline" />}
            items={[
                { label: "Save (2s)", leftIcon: "save", onClick: () => wait(2000) },
                { label: "Refresh", leftIcon: "refresh", onClick: () => console.log("refresh") },
                { type: "separator" },
                { label: "Delete (3s)", leftIcon: "trash", variant: "danger", onClick: () => wait(3000) },
            ]}
        />
    ),
};

export const ProfileMenu: Story = {
    render: () => (
        <DropdownMenu
            position="bottom-end"
            trigger={<Button label="Account" iconName="user" variant="outline" />}
            items={[
                { type: "label", label: "John Doe", description: "john.doe@example.com" },
                { type: "separator" },
                { label: "Profile", leftIcon: "user" },
                { label: "Settings", leftIcon: "settings" },
                { type: "separator" },
                { label: "Log out", leftIcon: "login", variant: "danger" },
            ]}
        />
    ),
};
