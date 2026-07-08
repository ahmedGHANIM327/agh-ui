import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Table from "./Table";
import type { ColumnDef, SortingState } from "./Table";
import Badge from "../badge/Badge";

// ── Sample data ────────────────────────────────────────────────────────────

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: "active" | "inactive" | "pending";
    age: number;
    department: string;
}

const sampleUsers: User[] = [
    { id: "1", name: "Alice Martin", email: "alice@example.com", role: "Admin", status: "active", age: 32, department: "Engineering" },
    { id: "2", name: "Bob Dupont", email: "bob@example.com", role: "Editor", status: "inactive", age: 28, department: "Design" },
    { id: "3", name: "Carol Smith", email: "carol@example.com", role: "Viewer", status: "pending", age: 25, department: "Marketing" },
    { id: "4", name: "David Lee", email: "david@example.com", role: "Editor", status: "active", age: 35, department: "Engineering" },
    { id: "5", name: "Eva Wilson", email: "eva@example.com", role: "Admin", status: "active", age: 30, department: "HR" },
    { id: "6", name: "Frank Brown", email: "frank@example.com", role: "Viewer", status: "inactive", age: 42, department: "Finance" },
];

const statusVariant: Record<User["status"], "primary" | "outline" | "destructive"> = {
    active: "primary",
    pending: "outline",
    inactive: "destructive",
};

const baseColumns: ColumnDef<User>[] = [
    { id: "name", header: "Name", accessorKey: "name", enableSorting: true },
    { id: "email", header: "Email", accessorKey: "email" },
    { id: "role", header: "Role", accessorKey: "role", enableSorting: true },
    {
        id: "status",
        header: "Status",
        cell: (row) => (
            <Badge variant={statusVariant[row.status]} size="sm" label={row.status} />
        ),
    },
    { id: "age", accessorKey: "age", enableSorting: true, className: "age_column" },
    { id: "department", header: "Department", accessorKey: "department" },
];

// ── Meta ───────────────────────────────────────────────────────────────────

const meta: Meta = {
    title: "Table",
    component: Table,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "A flexible data table component supporting sorting, row selection (single/multiple), sticky columns, column visibility and loading state.",
            },
        },
    },
};

export default meta;
type Story = StoryObj;

// ── Stories ────────────────────────────────────────────────────────────────

/** Basic table – read-only, no extras. */
export const Default: Story = {
    render: () => (
        <Table<User>
            columns={baseColumns}
            data={sampleUsers}
            getRowId={(row) => row.id}
        />
    ),
};

/** Sorting – click a column header to cycle through asc → desc → none. */
export const WithSorting: Story = {
    render: () => {
        const [sorting, setSorting] = useState<SortingState | undefined>(undefined);

        const sortedData = [...sampleUsers].sort((a, b) => {
            if (!sorting) return 0;
            const key = sorting.columnId as keyof User;
            const valA = a[key];
            const valB = b[key];
            const cmp = String(valA).localeCompare(String(valB), undefined, { numeric: true });
            return sorting.direction === "asc" ? cmp : -cmp;
        });

        return (
            <Table<User>
                columns={baseColumns}
                data={sortedData}
                sorting={sorting}
                setSorting={setSorting}
                getRowId={(row) => row.id}
            />
        );
    },
};

/** Multiple row selection – header checkbox selects/deselects all. */
export const MultipleSelection: Story = {
    render: () => {
        const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <Table<User>
                    columns={baseColumns}
                    data={sampleUsers}
                    selectedRowIds={selectedRowIds}
                    setSelectedRowIds={setSelectedRowIds}
                    selectionMode="multiple"
                    getRowId={(row) => row.id}
                />
                <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                    Selected: {selectedRowIds.length > 0 ? selectedRowIds.join(", ") : "none"}
                </p>
            </div>
        );
    },
};

/** Single row selection – radio buttons, header X deselects. */
export const SingleSelection: Story = {
    render: () => {
        const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <Table<User>
                    columns={baseColumns}
                    data={sampleUsers}
                    selectedRowIds={selectedRowIds}
                    setSelectedRowIds={setSelectedRowIds}
                    selectionMode="single"
                    getRowId={(row) => row.id}
                />
                <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                    Selected: {selectedRowIds.length > 0 ? selectedRowIds[0] : "none"}
                </p>
            </div>
        );
    },
};

/** Sorting + multiple selection combined. */
export const SortingAndSelection: Story = {
    render: () => {
        const [sorting, setSorting] = useState<SortingState | undefined>(undefined);
        const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

        const sortedData = [...sampleUsers].sort((a, b) => {
            if (!sorting) return 0;
            const key = sorting.columnId as keyof User;
            const cmp = String(a[key]).localeCompare(String(b[key]), undefined, { numeric: true });
            return sorting.direction === "asc" ? cmp : -cmp;
        });

        return (
            <Table<User>
                columns={baseColumns}
                data={sortedData}
                sorting={sorting}
                setSorting={setSorting}
                selectedRowIds={selectedRowIds}
                setSelectedRowIds={setSelectedRowIds}
                getRowId={(row) => row.id}
            />
        );
    },
};

/** Loading overlay – data is hidden behind a spinner. */
export const Loading: Story = {
    render: () => (
        <Table<User>
            columns={baseColumns}
            data={[]}
            isLoading={true}
            getRowId={(row) => row.id}
        />
    ),
};

/** Empty state – no rows in data. */
export const EmptyState: Story = {
    render: () => (
        <Table<User>
            columns={baseColumns}
            data={[]}
            noDataMessage="No users found. Try adjusting your filters."
            getRowId={(row) => row.id}
        />
    ),
};

/** Sticky right column – scroll horizontally to see the effect. */
export const StickyColumn: Story = {
    render: () => {
        const columns: ColumnDef<User>[] = [
            { id: "name", header: "Name", accessorKey: "name" },
            { id: "email", header: "Email", accessorKey: "email" },
            { id: "role", header: "Role", accessorKey: "role" },
            { id: "department", header: "Department", accessorKey: "department" },
            { id: "age", header: "Age", accessorKey: "age" },
            {
                id: "status",
                header: "Status",
                sticky: true,
                cell: (row) => (
                    <Badge variant={statusVariant[row.status]} size="sm" label={row.status} />
                ),
            },
        ];

        return (
            <div style={{ maxWidth: "500px" }}>
                <Table<User>
                    columns={columns}
                    data={sampleUsers}
                    getRowId={(row) => row.id}
                />
            </div>
        );
    },
};

/** Column visibility – toggle which columns are visible. */
export const ColumnVisibility: Story = {
    render: () => {
        const allColumns: ColumnDef<User>[] = [
            { id: "name", header: "Name", accessorKey: "name", enableHiding: true },
            { id: "email", header: "Email", accessorKey: "email", enableHiding: true },
            { id: "role", header: "Role", accessorKey: "role", enableHiding: true },
            { id: "department", header: "Department", accessorKey: "department", enableHiding: true },
            { id: "age", header: "Age", accessorKey: "age", enableHiding: true },
            {
                id: "status",
                header: "Status",
                enableHiding: true,
                cell: (row) => (
                    <Badge variant={statusVariant[row.status]} size="sm" label={row.status} />
                ),
            },
        ];

        const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
            name: true,
            email: true,
            role: true,
            department: true,
            age: true,
            status: true,
        });

        const hidableColumns = allColumns.filter((c) => c.enableHiding);

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    {hidableColumns.map((col) => (
                        <label
                            key={col.id}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.375rem",
                                fontSize: "0.8rem",
                                cursor: "pointer",
                                color: "var(--foreground)",
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={columnVisibility[col.id] !== false}
                                onChange={() =>
                                    setColumnVisibility((prev) => ({
                                        ...prev,
                                        [col.id]: !prev[col.id],
                                    }))
                                }
                            />
                            {String(col.header)}
                        </label>
                    ))}
                </div>

                <Table<User>
                    columns={allColumns}
                    data={sampleUsers}
                    columnVisibility={columnVisibility}
                    setColumnVisibility={setColumnVisibility}
                    getRowId={(row) => row.id}
                />
            </div>
        );
    },
};

/** Custom cell renderers – mixing text and components. */
export const CustomCells: Story = {
    render: () => {
        const columns: ColumnDef<User>[] = [
            {
                id: "name",
                header: "User",
                cell: (row) => (
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        <span style={{ fontWeight: 500 }}>{row.name}</span>
                        <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                            {row.email}
                        </span>
                    </div>
                ),
            },
            { id: "role", header: "Role", accessorKey: "role" },
            { id: "department", header: "Department", accessorKey: "department" },
            {
                id: "status",
                header: "Status",
                cell: (row) => (
                    <Badge variant={statusVariant[row.status]} size="sm" label={row.status} />
                ),
            },
        ];

        return (
            <Table<User>
                columns={columns}
                data={sampleUsers}
                getRowId={(row) => row.id}
            />
        );
    },
};

/** Full-featured – sorting + multiple selection + sticky column. */
export const FullFeatured: Story = {
    render: () => {
        const [sorting, setSorting] = useState<SortingState | undefined>(undefined);
        const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

        const columns: ColumnDef<User>[] = [
            { id: "name", header: "Name", accessorKey: "name", enableSorting: true },
            { id: "email", header: "Email", accessorKey: "email" },
            { id: "role", header: "Role", accessorKey: "role", enableSorting: true },
            { id: "department", header: "Department", accessorKey: "department" },
            { id: "age", header: "Age", accessorKey: "age", enableSorting: true },
            {
                id: "status",
                header: "Status",
                sticky: true,
                cell: (row) => (
                    <Badge variant={statusVariant[row.status]} size="sm" label={row.status} />
                ),
            },
        ];

        const sortedData = [...sampleUsers].sort((a, b) => {
            if (!sorting) return 0;
            const key = sorting.columnId as keyof User;
            const cmp = String(a[key]).localeCompare(String(b[key]), undefined, { numeric: true });
            return sorting.direction === "asc" ? cmp : -cmp;
        });

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <Table<User>
                    columns={columns}
                    data={sortedData}
                    sorting={sorting}
                    setSorting={setSorting}
                    selectedRowIds={selectedRowIds}
                    setSelectedRowIds={setSelectedRowIds}
                    getRowId={(row) => row.id}
                />
                <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                    Selected IDs: {selectedRowIds.length > 0 ? selectedRowIds.join(", ") : "none"}
                </p>
            </div>
        );
    },
};
