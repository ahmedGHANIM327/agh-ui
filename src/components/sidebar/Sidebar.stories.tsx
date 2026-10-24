import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Sidebar, { SidebarInset, SidebarProvider, type SidebarProps } from "./Sidebar";
import { useSidebar } from "./useSidebar";
import SidebarNav from "../sidebarnav/SidebarNav";
import Button from "../button/Button";
import Typography from "../typography/Typography";
import Avatar from "../avatar/Avatar";

const meta: Meta<SidebarProps> = {
    title: "Sidebar",
    component: Sidebar,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "Sidebar is a left panel with header, footer and scrollable content. SidebarProvider wraps the app and displays the sidebar next to the app content (SidebarInset). Use the useSidebar hook to read the state and open/close it.",
            },
        },
    },
    argTypes: {
        children: {
            control: false,
            description: "Scrollable content of the sidebar.",
            table: { category: "Content", type: { summary: "ReactNode" } },
        },
        header: {
            control: false,
            description: "Optional block pinned at the top.",
            table: { category: "Content", type: { summary: "ReactNode" } },
        },
        footer: {
            control: false,
            description: "Optional block pinned at the bottom.",
            table: { category: "Content", type: { summary: "ReactNode" } },
        },
        width: {
            control: "text",
            description: "Sidebar width (number in px or CSS value).",
            table: {
                category: "Appearance",
                type: { summary: "number | string" },
                defaultValue: { summary: "300" },
            },
        },
        background: {
            control: "color",
            description: "Background color (any CSS color / variable).",
            table: {
                category: "Appearance",
                type: { summary: "string" },
                defaultValue: { summary: "var(--muted)" },
            },
        },
        className: {
            control: "text",
            table: { category: "Style", type: { summary: "string" } },
        },
    },
};

export default meta;

type Story = StoryObj<SidebarProps>;

const ToggleButton = () => {
    const { isOpen, toggle } = useSidebar();
    return (
        <Button
            variant="outline"
            iconName="menu"
            label={isOpen ? "Close sidebar" : "Open sidebar"}
            onClick={toggle}
        />
    );
};

export const Default: Story = {
    args: { width: 300 },
    render: (args) => (
        <SidebarProvider>
            <Sidebar
                {...args}
                header={<Typography variant="h3">My App</Typography>}
                footer={
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <Avatar fallback="JD" variant="primary" />
                        <div>
                            <Typography variant="p-sm">John Doe</Typography>
                            <Typography variant="p-sm" color="muted">john.doe@example.com</Typography>
                        </div>
                    </div>
                }
            >
                <SidebarNav
                    blocks={[
                        {
                            title: "Platform",
                            items: [
                                { label: "Dashboard", icon: "home", to: "/dashboard", isActive: true },
                                {
                                    label: "Users",
                                    icon: "users",
                                    to: "/users",
                                    subItems: [
                                        { label: "All users", to: "/users" },
                                        { label: "Roles", to: "/users/roles" },
                                    ],
                                },
                            ],
                        },
                        {
                            title: "Settings",
                            items: [{ label: "Account", icon: "user", to: "/account" }],
                        },
                    ]}
                />
            </Sidebar>
            <SidebarInset>
                <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <ToggleButton />
                    <Typography variant="p-sm" color="muted">
                        App content displayed next to the sidebar.
                    </Typography>
                </div>
            </SidebarInset>
        </SidebarProvider>
    ),
};

export const CustomWidthAndBackground: Story = {
    render: () => (
        <SidebarProvider>
            <Sidebar width={220} background="var(--primary)" header={<Typography variant="h3" color="primary">Narrow</Typography>}>
                <Typography variant="p-sm">Custom 220px sidebar</Typography>
            </Sidebar>
            <SidebarInset>
                <div style={{ padding: "1rem" }}>
                    <ToggleButton />
                </div>
            </SidebarInset>
        </SidebarProvider>
    ),
};

export const ScrollableContent: Story = {
    render: () => (
        <SidebarProvider defaultOpen>
            <Sidebar
                header={<Typography variant="h3">Header</Typography>}
                footer={<Typography variant="p-sm" color="muted">Footer</Typography>}
            >
                {Array.from({ length: 40 }, (_, i) => (
                    <Typography key={i} variant="p-sm">Row {i + 1}</Typography>
                ))}
            </Sidebar>
            <SidebarInset>
                <div style={{ padding: "1rem" }}>
                    <ToggleButton />
                </div>
            </SidebarInset>
        </SidebarProvider>
    ),
};

const translations = {
    fr: {
        dir: "ltr" as const,
        title: "Mon application",
        platform: "Plateforme",
        dashboard: "Tableau de bord",
        users: "Utilisateurs",
        all: "Tous les utilisateurs",
        roles: "Rôles",
        settings: "Paramètres",
        account: "Compte",
        content: "Le contenu de l'application s'affiche à côté de la sidebar.",
    },
    ar: {
        dir: "rtl" as const,
        title: "تطبيقي",
        platform: "المنصة",
        dashboard: "لوحة التحكم",
        users: "المستخدمون",
        all: "كل المستخدمين",
        roles: "الأدوار",
        settings: "الإعدادات",
        account: "الحساب",
        content: "يظهر محتوى التطبيق بجانب الشريط الجانبي.",
    },
};

export const LanguageDirection: Story = {
    render: () => {
        const [lang, setLang] = useState<"fr" | "ar">("ar");
        const tr = translations[lang];

        return (
            <div dir={tr.dir}>
                <SidebarProvider defaultOpen>
                    <Sidebar header={<Typography variant="h3">{tr.title}</Typography>}>
                        <SidebarNav
                            blocks={[
                                {
                                    title: tr.platform,
                                    items: [
                                        { label: tr.dashboard, icon: "home", to: "/dashboard", isActive: true },
                                        {
                                            label: tr.users,
                                            icon: "users",
                                            to: "/users",
                                            badge: { label: "12", variant: "outline" },
                                            subItems: [
                                                { label: tr.all, to: "/users" },
                                                { label: tr.roles, to: "/users/roles" },
                                            ],
                                        },
                                    ],
                                },
                                { title: tr.settings, items: [{ label: tr.account, icon: "user", to: "/account" }] },
                            ]}
                        />
                    </Sidebar>
                    <SidebarInset>
                        <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                                <ToggleButton />
                                <Button
                                    variant={lang === "fr" ? "primary" : "outline"}
                                    label="Français"
                                    onClick={() => setLang("fr")}
                                />
                                <Button
                                    variant={lang === "ar" ? "primary" : "outline"}
                                    label="العربية"
                                    onClick={() => setLang("ar")}
                                />
                            </div>
                            <Typography variant="p-sm" color="muted">{tr.content}</Typography>
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            </div>
        );
    },
};
