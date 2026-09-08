import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Combobox from "./Combobox";
import Badge from "../badge/Badge";

// ── Data ─────────────────────────────────────────────────────────────────
interface Country {
    code: string;
    name: string;
    continent: "Europe" | "Africa" | "Asia" | "America" | "Oceania";
}

const countries: Country[] = [
    { code: "fr", name: "France", continent: "Europe" },
    { code: "de", name: "Germany", continent: "Europe" },
    { code: "es", name: "Spain", continent: "Europe" },
    { code: "it", name: "Italy", continent: "Europe" },
    { code: "be", name: "Belgium", continent: "Europe" },
    { code: "pt", name: "Portugal", continent: "Europe" },
    { code: "ma", name: "Morocco", continent: "Africa" },
    { code: "sn", name: "Senegal", continent: "Africa" },
    { code: "jp", name: "Japan", continent: "Asia" },
    { code: "kr", name: "South Korea", continent: "Asia" },
    { code: "us", name: "United States", continent: "America" },
    { code: "br", name: "Brazil", continent: "America" },
    { code: "au", name: "Australia", continent: "Oceania" },
];

interface User {
    id: string;
    firstName: string;
    lastName: string;
    role: "admin" | "editor" | "viewer";
}

const users: User[] = [
    { id: "u1", firstName: "Ada", lastName: "Lovelace", role: "admin" },
    { id: "u2", firstName: "Alan", lastName: "Turing", role: "admin" },
    { id: "u3", firstName: "Grace", lastName: "Hopper", role: "editor" },
    { id: "u4", firstName: "Linus", lastName: "Torvalds", role: "editor" },
    { id: "u5", firstName: "Margaret", lastName: "Hamilton", role: "viewer" },
    { id: "u6", firstName: "Dennis", lastName: "Ritchie", role: "viewer" },
];

// ── Meta ─────────────────────────────────────────────────────────────────
const meta: Meta<typeof Combobox<Country>> = {
    title: "Combobox",
    component: Combobox<Country>,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Generic Combobox that lets users select a single value from a list of arbitrary objects. The consumer provides `getOptionValue`, `renderOption`, and optionally `renderValue` and `searchKeys` (the fields on which the search runs). Features: keyboard navigation, optional search, and a dedicated portal for the dropdown.",
            },
        },
    },
    decorators: [
        (Story) => (
            <div style={{ width: 340 }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Combobox<Country>>;

// ── Stories ──────────────────────────────────────────────────────────────
export const Default: Story = {
    args: {
        options: countries,
        label: "Country",
        placeholder: "Select a country",
        description: "Choose your country of residence.",
        getOptionValue: (c) => c.code,
        renderOption: (c) => c.name,
    },
};

export const Searchable: Story = {
    args: {
        ...Default.args,
        searchable: true,
        searchKeys: ["name"],
        placeholder: "Search a country",
    },
};

export const WithDefaultValue: Story = {
    args: {
        ...Default.args,
        defaultValue: "fr",
    },
};

export const Disabled: Story = {
    args: {
        ...Default.args,
        disabled: true,
        defaultValue: "fr",
    },
};

export const Required: Story = {
    args: {
        ...Default.args,
        required: true,
    },
};

export const WithError: Story = {
    args: {
        ...Default.args,
        error: "Please select a country.",
        required: true,
    },
};

/**
 * Rich rendering: each option shows the country name plus a Badge for the
 * continent. `renderValue` returns a lighter representation for the trigger.
 */
export const RichRendering: Story = {
    args: {
        options: countries,
        label: "Country",
        placeholder: "Select a country",
        searchable: true,
        getOptionValue: (c) => c.code,
        searchKeys: ["name"],
        renderOption: (c) => (
            <span
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                    width: "100%",
                }}
            >
                <span>{c.name}</span>
                <Badge variant="outline" label={c.continent} />
            </span>
        ),
        renderValue: (c) => `${c.name} (${c.code.toUpperCase()})`,
    },
};

/**
 * Combobox typed with a completely different object type (User).
 * Illustrates: `firstName + lastName` label, search on both fields,
 * value = `id`, and a Badge for the role.
 */
export const UsersCombobox: StoryObj<typeof Combobox<User>> = {
    render: () => {
        const [selected, setSelected] = useState<string | undefined>();

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Combobox<User>
                    label="Assignee"
                    placeholder="Select a user"
                    description="Search by first or last name."
                    options={users}
                    searchable
                    value={selected}
                    onValueChange={(v) => setSelected(v as string)}
                    getOptionValue={(u) => u.id}
                    searchKeys={["firstName", "lastName"]}
                    renderOption={(u) => (
                        <span
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 8,
                                width: "100%",
                            }}
                        >
                            <span>
                                {u.firstName} {u.lastName}
                            </span>
                            <Badge
                                variant={
                                    u.role === "admin"
                                        ? "destructive"
                                        : u.role === "editor"
                                          ? "primary"
                                          : "outline"
                                }
                                label={u.role}
                            />
                        </span>
                    )}
                    renderValue={(u) => `${u.firstName} ${u.lastName}`}
                />
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 14 }}>
                    Selected id: <strong>{selected ?? "—"}</strong>
                </p>
            </div>
        );
    },
};

/**
 * Options as plain strings: `searchKeys` is ignored and the search runs
 * directly on each string. Minimal setup — just `getOptionValue` and
 * `renderOption` that return the string as-is.
 */
const fruits = [
    "Apple",
    "Apricot",
    "Banana",
    "Blackberry",
    "Blueberry",
    "Cherry",
    "Coconut",
    "Grape",
    "Kiwi",
    "Lemon",
    "Mango",
    "Orange",
    "Peach",
    "Pear",
    "Pineapple",
    "Raspberry",
    "Strawberry",
    "Watermelon",
];

export const StringOptions: StoryObj<typeof Combobox<string>> = {
    render: () => (
        <Combobox<string>
            label="Fruit"
            placeholder="Pick a fruit"
            description="Type to filter the list."
            options={fruits}
            searchable
            getOptionValue={(f) => f}
            renderOption={(f) => f}
        />
    ),
};

/**
 * Multi-select: `multiple` is true, `value`/`defaultValue` are string arrays,
 * and the dropdown stays open on each toggle. `onValueChange` receives the
 * updated array of values and the array of matching options.
 */
export const MultiSelect: StoryObj<typeof Combobox<Country>> = {
    render: () => {
        const [values, setValues] = useState<string[]>(["fr", "es"]);
        return (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Combobox<Country>
                    label="Countries"
                    placeholder="Select countries"
                    description="Pick as many as you want."
                    options={countries}
                    multiple
                    searchable
                    searchKeys={["name"]}
                    value={values}
                    onValueChange={(v) => setValues(v as string[])}
                    getOptionValue={(c) => c.code}
                    renderOption={(c) => c.name}
                    renderValue={(c) => c.name}
                />
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 14 }}>
                    Selected: <strong>{values.join(", ") || "—"}</strong>
                </p>
            </div>
        );
    },
};

/**
 * Multi-select on plain string options with default values.
 */
export const MultiSelectStrings: StoryObj<typeof Combobox<string>> = {
    render: () => (
        <Combobox<string>
            label="Fruits"
            placeholder="Pick fruits"
            description="Multiple selection with plain string options."
            options={fruits}
            multiple
            searchable
            defaultValue={["Apple", "Mango"]}
            getOptionValue={(f) => f}
            renderOption={(f) => f}
        />
    ),
};

/**
 * Multi-select with `maxVisibleBadges` set to 4: up to 4 badges are shown
 * in the trigger before collapsing extras into a `+N` overflow badge.
 */
export const MultiSelectCustomMaxBadges: StoryObj<typeof Combobox<Country>> = {
    render: () => {
        const [values, setValues] = useState<string[]>([
            "fr",
            "de",
            "es",
            "it",
            "be",
            "pt",
        ]);
        return (
            <Combobox<Country>
                label="Countries"
                placeholder="Select countries"
                options={countries}
                multiple
                maxVisibleBadges={4}
                searchable
                searchKeys={["name"]}
                value={values}
                onValueChange={(v) => setValues(v as string[])}
                getOptionValue={(c) => c.code}
                renderOption={(c) => c.name}
                renderValue={(c) => c.name}
            />
        );
    },
};
