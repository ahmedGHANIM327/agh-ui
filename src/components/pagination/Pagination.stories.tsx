import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Pagination from "./Pagination";

const meta: Meta<typeof Pagination> = {
    title: "Pagination",
    component: Pagination,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "A pagination component for navigating through pages. Supports ellipsis for large page counts and configurable max visible pages.",
            },
        },
    },
    argTypes: {
        page: {
            control: { type: "number", min: 1 },
            description: "Current active page (1-based).",
            table: { category: "State" },
        },
        nbPages: {
            control: { type: "number", min: 1 },
            description: "Total number of pages.",
            table: { category: "State" },
        },
        maxToShow: {
            control: { type: "number", min: 1, max: 10 },
            description: "Maximum number of page buttons to display at once.",
            table: { category: "Appearance", defaultValue: { summary: "3" } },
        },
        onPageChange: {
            action: "onPageChange",
            description: "Callback fired when the user selects a page.",
            table: { category: "Events" },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// ── Interactive wrapper ────────────────────────────────────────────────────

const InteractivePagination = (args: Partial<typeof Pagination> & { page?: number; nbPages?: number; maxToShow?: number }) => {
    const [page, setPage] = useState(args.page ?? 1);
    return (
        <Pagination
            page={page}
            nbPages={args.nbPages ?? 10}
            maxToShow={args.maxToShow}
            onPageChange={(p) => {
                setPage(p);
            }}
        />
    );
};

// ── Stories ────────────────────────────────────────────────────────────────

/** Default — 10 pages, starts on page 1. */
export const Default: Story = {
    render: (args) => <InteractivePagination {...args} />,
    args: {
        page: 1,
        nbPages: 10,
        maxToShow: 3,
    },
};

/** Few pages — no ellipsis needed. */
export const FewPages: Story = {
    render: (args) => <InteractivePagination {...args} />,
    args: {
        page: 1,
        nbPages: 3,
        maxToShow: 3,
    },
};

/** Middle page — ellipsis on both sides. */
export const MiddlePage: Story = {
    render: (args) => <InteractivePagination {...args} />,
    args: {
        page: 5,
        nbPages: 10,
        maxToShow: 3,
    },
};

/** Last page. */
export const LastPage: Story = {
    render: (args) => <InteractivePagination {...args} />,
    args: {
        page: 10,
        nbPages: 10,
        maxToShow: 3,
    },
};

/** Single page — both nav buttons disabled. */
export const SinglePage: Story = {
    render: () => (
        <Pagination page={1} nbPages={1} onPageChange={() => {}} />
    ),
};

/** More pages visible (maxToShow = 5). */
export const WideWindow: Story = {
    render: (args) => <InteractivePagination {...args} />,
    args: {
        page: 1,
        nbPages: 20,
        maxToShow: 5,
    },
};
