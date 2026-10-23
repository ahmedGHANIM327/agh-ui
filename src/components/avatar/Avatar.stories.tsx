import type { Meta, StoryObj } from "@storybook/react-vite";
import Avatar from "./Avatar";

const IMG = "https://i.pravatar.cc/200?img=12";

const meta: Meta<typeof Avatar> = {
    title: "Avatar",
    component: Avatar,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Avatar displays an image, an icon or a text fallback in a round shape, with an optional badge at the bottom right.",
            },
        },
    },
    argTypes: {
        image: {
            control: "object",
            description: "Image attributes (src, alt, title, ...).",
            table: { category: "Content", type: { summary: "ImgHTMLAttributes<HTMLImageElement>" } },
        },
        iconName: {
            control: "text",
            description: "Icon displayed when there is no image.",
            table: { category: "Content", type: { summary: "IconName" } },
        },
        iconSize: {
            control: "number",
            description: "Icon size in px (defaults to half of the avatar size).",
            table: { category: "Content", type: { summary: "number" } },
        },
        fallback: {
            control: "text",
            description: "Text displayed if the image fails to load or no icon is given.",
            table: { category: "Content", type: { summary: "string" } },
        },
        variant: {
            control: "select",
            options: ["default", "primary", "outline", "muted"],
            description: "Visual variant (visible for icon and fallback content).",
            table: {
                category: "Appearance",
                type: { summary: "AvatarVariant" },
                defaultValue: { summary: "muted" },
            },
        },
        size: {
            control: "select",
            options: ["small", "default", "large", 72],
            description: "Preset size or custom size in px.",
            table: {
                category: "Appearance",
                type: { summary: "'small' | 'default' | 'large' | number" },
                defaultValue: { summary: "default" },
            },
        },
        badge: {
            control: "object",
            description: "Badge props, rendered at the bottom right.",
            table: { category: "Appearance", type: { summary: "BadgeProps" } },
        },
        className: {
            control: "text",
            table: { category: "Style", type: { summary: "string" } },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
    args: { image: { src: IMG, alt: "John Doe", title: "John Doe" } },
};

export const Icon: Story = {
    args: { iconName: "user" },
};

export const Fallback: Story = {
    args: { fallback: "JD" },
};

export const BrokenImageFallback: Story = {
    args: { image: { src: "https://invalid.example/missing.png", alt: "John Doe" }, fallback: "JD" },
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Avatar size="small" image={{ src: IMG, alt: "small" }} />
            <Avatar image={{ src: IMG, alt: "default" }} />
            <Avatar size="large" image={{ src: IMG, alt: "large" }} />
            <Avatar size={96} image={{ src: IMG, alt: "custom" }} />
        </div>
    ),
};

export const WithBadge: Story = {
    render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <Avatar size="large" image={{ src: IMG, alt: "John" }} badge={{ variant: "primary", iconName: "check" }} />
            <Avatar size="large" fallback="JD" badge={{ variant: "destructive", label: "3" }} />
            <Avatar size="large" iconName="user" badge={{ variant: "outline", label: "New" }} />
        </div>
    ),
};

export const Variants: Story = {
    render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Avatar variant="default" fallback="JD" />
            <Avatar variant="primary" fallback="JD" />
            <Avatar variant="outline" fallback="JD" />
            <Avatar variant="muted" fallback="JD" />
        </div>
    ),
};

export const EmptyBadge: Story = {
    render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <Avatar variant={'primary'} fallback="JD" badge={{ variant: "primary" }} />
            <Avatar size="large" fallback="JD" badge={{ variant: "destructive", iconName: "x" }} />
        </div>
    ),
};
