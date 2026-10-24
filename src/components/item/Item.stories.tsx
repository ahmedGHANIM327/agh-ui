import type { Meta, StoryObj } from "@storybook/react-vite";
import Item from "./Item";
import Avatar from "../avatar/Avatar";
import Button from "../button/Button";

const meta: Meta<typeof Item> = {
    title: "Item",
    component: Item,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Item displays a label with an optional icon/media, description and badge on the left, and an optional action or information on the right. It can be an action (onClick), a link (to) or static.",
            },
        },
    },
    decorators: [
        (Story) => (
            <div style={{ width: "460px" }}>
                <Story />
            </div>
        ),
    ],
    argTypes: {
        label: {
            control: "text",
            description: "Title of the item.",
            table: { category: "Content", type: { summary: "string" } },
        },
        description: {
            control: "text",
            description: "Optional description under the label.",
            table: { category: "Content", type: { summary: "string" } },
        },
        iconName: {
            control: "text",
            description: "Icon displayed on the left of the label.",
            table: { category: "Content", type: { summary: "IconName" } },
        },
        media: {
            control: false,
            description: "Media (image, avatar...) on the left side.",
            table: { category: "Content", type: { summary: "ReactNode" } },
        },
        badge: {
            control: "object",
            description: "Badge props, displayed on the right of the label.",
            table: { category: "Content", type: { summary: "BadgeProps" } },
        },
        right: {
            control: false,
            description: "Right side content: text, button, icon button...",
            table: { category: "Content", type: { summary: "ReactNode" } },
        },
        variant: {
            control: "select",
            options: ["default", "primary", "outline", "ghost"],
            table: {
                category: "Appearance",
                type: { summary: "ItemVariant" },
                defaultValue: { summary: "default" },
            },
        },
        size: {
            control: "select",
            options: ["lg", "default", "sm"],
            table: {
                category: "Appearance",
                type: { summary: "ItemSize" },
                defaultValue: { summary: "default" },
            },
        },
        onClick: {
            control: false,
            description: "Makes the item an action.",
            table: { category: "Behavior", type: { summary: "() => void" } },
        },
        to: {
            control: "text",
            description: "Makes the item a link.",
            table: { category: "Behavior", type: { summary: "string" } },
        },
        target: {
            control: "text",
            description: "Link target (e.g. _blank).",
            table: { category: "Behavior", type: { summary: "string" } },
        },
        disabled: {
            control: "boolean",
            table: {
                category: "Behavior",
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        className: {
            control: "text",
            table: { category: "Style", type: { summary: "string" } },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Item>;

export const Default: Story = {
    args: {
        label: "Two-factor authentication",
        description: "Secure your account with an extra step.",
        iconName: "shield",
        badge: { label: "Recommended", variant: "primary" },
        right: <Button label="Enable" size="sm" variant="outline" />,
    },
};

export const Variants: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <Item variant="default" label="Default" description="Muted background" />
            <Item variant="primary" label="Primary" description="Primary background" />
            <Item variant="outline" label="Outline" description="Bordered item" />
            <Item variant="ghost" label="Ghost" description="No background" />
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <Item variant="outline" size="lg" iconName="settings" label="Large" description="Large item" />
            <Item variant="outline" size="default" iconName="settings" label="Default" description="Default item" />
            <Item variant="outline" size="sm" iconName="settings" label="Small" description="Small item" />
        </div>
    ),
};

export const WithMedia: Story = {
    render: () => (
        <Item
            variant="outline"
            media={<Avatar fallback="JD" badge={{ variant: "primary" }} />}
            label="John Doe"
            description="john.doe@example.com"
            badge={{ label: "Admin", variant: "outline" }}
            right={<Button size="icon" variant="ghost" iconName="mail" aria-label="Send mail" />}
        />
    ),
};

export const RightSide: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <Item variant="outline" label="Storage" description="Used space" right="12.4 GB" />
            <Item variant="outline" label="Billing" right={<Button size="icon" variant="ghost" iconName="link" aria-label="Open" />} />
            <Item variant="outline" label="Delete account" right={<Button size="sm" variant="destructive" label="Delete" />} />
        </div>
    ),
};

export const ActionAndLink: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <Item variant="outline" iconName="copy" label="Action item" description="Triggers onClick" onClick={() => alert("clicked")} />
            <Item variant="outline" iconName="link" label="Link item" description="Opens an external page" to="https://example.com" target="_blank" right="↗" />
            <Item variant="outline" iconName="lock" label="Disabled" description="Not clickable" onClick={() => undefined} disabled />
        </div>
    ),
};
