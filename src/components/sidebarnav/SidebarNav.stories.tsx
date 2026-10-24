import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import SidebarNav, { type SidebarNavBlock, type SidebarNavProps } from "./SidebarNav";

const meta: Meta<typeof SidebarNav> = {
    title: "SidebarNav",
    component: SidebarNav,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "SidebarNav renders navigation blocks (optional title and icon) containing items with optional sub items. Items without `to` and without sub items are not clickable.",
            },
        },
    },
    decorators: [
        (Story) => (
            <div style={{ width: "260px" }}>
                <Story />
            </div>
        ),
    ],
    argTypes: {
        blocks: {
            control: "object",
            description:
                "Blocks: title, titleIcon and items (icon, label, to, disabled, hide, isActive, subItems).",
            table: { category: "Content", type: { summary: "SidebarNavBlock[]" } },
        },
        onNavigate: {
            control: false,
            description: "Called when an item with `to` is clicked. Prevents the default link navigation.",
            table: { category: "Behavior", type: { summary: "(to: string, item: SidebarNavItem) => void" } },
        },
        className: {
            control: "text",
            table: { category: "Style", type: { summary: "string" } },
        },
    },
};

export default meta;

type Story = StoryObj<typeof SidebarNav>;

const blocks: SidebarNavBlock[] = [
    {
        title: "Platform",
        titleIcon: "home",
        items: [
            { label: "Dashboard", icon: "home", to: "/dashboard", isActive: true },
            {
                label: "Users",
                icon: "users",
                to: "/users",
                badge: { label: "12", variant: "outline" },
                subItems: [
                    { label: "All users", to: "/users" },
                    { label: "Roles", to: "/users/roles" },
                    { label: "Invitations", to: "/users/invitations", disabled: true },
                ],
            },
            { label: "Hidden", icon: "eye", to: "/hidden", hide: true },
        ],
    },
    {
        title: "Settings",
        items: [
            { label: "Account", icon: "user", to: "/account", badge: { label: "New", variant: "primary" } },
            { label: "Billing (soon)", icon: "lock", to: "/billing", disabled: true },
            { label: "No link", icon: "info" },
        ],
    },
];

export const Default: Story = {
    args: { blocks },
};

export const WithActiveState: Story = {
    render: (args: SidebarNavProps) => {
        const [active, setActive] = useState("/dashboard");

        const mark = (items: SidebarNavBlock["items"]): SidebarNavBlock["items"] =>
            items.map((item) => ({
                ...item,
                isActive: item.to === active,
                subItems: item.subItems ? mark(item.subItems) : undefined,
            }));

        return (
            <SidebarNav
                {...args}
                blocks={blocks.map((b) => ({ ...b, items: mark(b.items) }))}
                onNavigate={(to) => setActive(to)}
            />
        );
    },
};
