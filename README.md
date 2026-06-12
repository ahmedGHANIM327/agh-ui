# AGH UI

> A modern, token-first React design system — built with **React 19**, **TypeScript**, **Vite**, **CSS Modules** and **CSS Variables**.

<div align="center">

[![npm version](https://img.shields.io/npm/v/@aghanim1206/ui-react.svg)](https://www.npmjs.com/package/@aghanim1206/ui-react)
[![npm downloads](https://img.shields.io/npm/dm/@aghanim1206/ui-react.svg)](https://www.npmjs.com/package/@aghanim1206/ui-react)
[![license](https://img.shields.io/npm/l/@aghanim1206/ui-react.svg)](./LICENSE)

**[📖 Storybook Documentation](https://agh-ui.shifaelib.com/)** · **[📦 npm](https://www.npmjs.com/package/@aghanim1206/ui-react)**

</div>

---

## Key features

- 🎨 **Token-first theming** — 6 built-in themes (light/dark × 3 color palettes), fully overridable via CSS variables
- 🧩 **CSS Modules** — component styles are isolated and hashed; internal classes never leak into your app
- 🌬️ **Tailwind-ready** — built-in preset for **Tailwind v3** and `@theme` snippet for **Tailwind v4**
- 🪝 **`ThemeProvider` + `useTheme`** — programmatic theme switching with React context
- 📦 **Typed tokens** — TypeScript object (`tokens`) mapping every CSS variable for safe usage
- ♿ **Accessible by default** — semantic HTML, keyboard navigation, `:focus-visible`, ARIA patterns
- 🔷 **React 19 + TypeScript** — full type coverage, no runtime dependencies

---

## Installation

```bash
npm install @aghanim1206/ui-react
# or
pnpm add @aghanim1206/ui-react
# or
yarn add @aghanim1206/ui-react
```

---

## Quick start

### Without Tailwind (plain CSS / any framework)

**1. Import the stylesheet once** in your app entry (`main.tsx` / `index.tsx`):

```ts
import "@aghanim1206/ui-react/style.css";
```

**2. Wrap your app with `ThemeProvider`:**

```tsx
import { ThemeProvider } from "@aghanim1206/ui-react";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light" global>
    <App />
  </ThemeProvider>
);
```

**3. Use components:**

```tsx
import { Button, Input, Card, Typography } from "@aghanim1206/ui-react";

export function LoginCard() {
  return (
    <Card>
      <Typography variant="h3">Sign in</Typography>
      <Input label="Email" type="email" placeholder="you@example.com" />
      <Input label="Password" type="password" />
      <Button variant="primary" label="Continue" />
    </Card>
  );
}
```

---

## Tailwind integration

### Tailwind v4

In your main CSS file, import the library stylesheet then map its CSS variables via `@theme inline`:

```css
/* src/index.css */
@import "tailwindcss";
@import "@aghanim1206/ui-react/style.css";

@theme inline {
  /* Colors */
  --color-background:             var(--background);
  --color-foreground:             var(--foreground);
  --color-primary:                var(--primary);
  --color-primary-foreground:     var(--primary-foreground);
  --color-muted:                  var(--muted);
  --color-muted-foreground:       var(--muted-foreground);
  --color-destructive:            var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border:                 var(--border);
  --color-input:                  var(--input);
  --color-ring:                   var(--ring);

  /* Border radius */
  --radius-sm:  var(--radius-sm);
  --radius-md:  var(--radius-md);
  --radius-lg:  var(--radius-lg);
  --radius-xl:  var(--radius-xl);
  --radius-2xl: var(--radius-2xl);

  /* Fonts */
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
}
```

> `@theme inline` forces Tailwind to inline the `var(--xxx)` references directly into generated utilities — theme switching (`.dark`, `.theme-green`, etc.) is automatically respected.

### Tailwind v3

Use the built-in preset:

```js
// tailwind.config.js
import preset from "@aghanim1206/ui-react/tailwind";

export default {
  presets: [preset],
  content: ["./src/**/*.{ts,tsx}"],
};
```

### Available utility classes (both v3 and v4)

Once configured, you can use design tokens directly as Tailwind classes:

```tsx
// Colors
<div className="bg-primary text-primary-foreground" />
<div className="bg-background text-foreground" />
<div className="bg-muted text-muted-foreground" />
<div className="border border-border" />
<p className="text-destructive" />

// Mixing with layout utilities
<div className="flex items-center gap-4 p-6 rounded-xl bg-background border border-border shadow-sm" />
```

---

## Theming

### Available themes

| Theme name | Light class | Dark class |
|---|---|---|
| Blue (default) | *(none)* | `dark` |
| Green | `theme-green` | `theme-green dark` |
| Purple | `theme-purple` | `theme-purple dark` |

### Option 1 — `ThemeProvider` (recommended)

```tsx
import { ThemeProvider, useTheme } from "@aghanim1206/ui-react";
import type { ThemeName } from "@aghanim1206/ui-react";
```

#### Global mode (applies classes on `<html>`)

```tsx
// main.tsx
<ThemeProvider defaultTheme="light" global>
  <App />
</ThemeProvider>
```

#### Scoped mode (applies classes on a wrapper `<div>`)

```tsx
// Multiple themes on the same page
<ThemeProvider defaultTheme="purple">
  <AdminSection />
</ThemeProvider>
```

#### Switch theme programmatically with `useTheme`

```tsx
import { useTheme } from "@aghanim1206/ui-react";
import type { ThemeName } from "@aghanim1206/ui-react";

const THEMES: { name: ThemeName; label: string }[] = [
  { name: "light",      label: "☀️ Light"        },
  { name: "dark",       label: "🌙 Dark"          },
  { name: "green",      label: "🌿 Green Light"   },
  { name: "greenDark",  label: "🌲 Green Dark"    },
  { name: "purple",     label: "💜 Purple Light"  },
  { name: "purpleDark", label: "🌌 Purple Dark"   },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-wrap gap-2">
      {THEMES.map(({ name, label }) => (
        <button
          key={name}
          onClick={() => setTheme(name)}
          className={`px-3 py-1 rounded-lg text-sm font-medium border transition-colors ${
            theme === name
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background text-foreground border-border hover:bg-muted"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
```

### Option 2 — CSS classes manually

```html
<!-- Light blue (default) -->
<html lang="en">

<!-- Dark blue -->
<html lang="en" class="dark">

<!-- Light green -->
<html lang="en" class="theme-green">

<!-- Dark purple -->
<html lang="en" class="theme-purple dark">
```

### Option 3 — Override tokens in your own CSS

```css
/* Your app's CSS — overrides specific tokens */
:root {
  --primary: #e11d48;           /* rose-600 */
  --primary-foreground: #fff;
  --background: #fafafa;
}

.dark {
  --primary: #fb7185;           /* rose-400 */
  --background: #09090b;
}
```

---

## TypeScript tokens

All CSS variables are exposed as a typed `tokens` object for safe programmatic usage:

```tsx
import { tokens } from "@aghanim1206/ui-react";

// Use in inline styles
<div style={{ backgroundColor: tokens.colors.primary }} />

// Use in canvas / chart libraries
const chartColors = {
  primary:    tokens.colors.primary,
  muted:      tokens.colors.muted,
  background: tokens.colors.background,
};

// Available namespaces
tokens.colors       // background, foreground, primary, muted, destructive, border, ring…
tokens.spacing      // 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16
tokens.radius       // sm, md, lg, xl, 2xl, full
tokens.fontSize     // xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl
tokens.fontWeight   // normal, medium, semibold, bold
tokens.fontFamily   // sans, mono
```

---

## Components

### Typography

```tsx
import { Typography } from "@aghanim1206/ui-react";

<Typography variant="h1">Page title</Typography>
<Typography variant="h3">Section title</Typography>
<Typography variant="p">Body text</Typography>
<Typography variant="p-sm" color="muted">Secondary info</Typography>
<Typography variant="p-xs" color="destructive">Error message</Typography>
<Typography variant="label">Form label</Typography>
```

| Prop | Type | Default |
|---|---|---|
| `variant` | `h1`–`h6` \| `p` \| `p-sm` \| `p-xs` \| `label` | `p` |
| `color` | `default` \| `muted` \| `primary` \| `destructive` | `default` |
| `className` | `string` | — |

---

### Button

```tsx
import { Button } from "@aghanim1206/ui-react";

<Button label="Save changes" />
<Button variant="primary"     label="Confirm" />
<Button variant="outline"     label="Cancel" />
<Button variant="destructive" label="Delete" />
<Button variant="ghost"       label="More" />
<Button variant="link"        label="Learn more" />

// Sizes
<Button size="sm" label="Small" />
<Button size="lg" label="Large" />
<Button size="icon" iconName="settings" />

// With icon
<Button variant="primary" iconName="plus" iconPosition="left" label="Add item" />

// Loading state
<Button isLoading label="Saving…" />
```

| Prop | Type | Default |
|---|---|---|
| `variant` | `default` \| `primary` \| `outline` \| `destructive` \| `ghost` \| `link` | `default` |
| `size` | `default` \| `sm` \| `lg` \| `icon` | `default` |
| `label` | `string` | — |
| `iconName` | `IconName` | — |
| `iconPosition` | `left` \| `right` | `left` |
| `isLoading` | `boolean` | `false` |

---

### Input

```tsx
import { Input } from "@aghanim1206/ui-react";

<Input label="Email" type="email" placeholder="you@example.com" />
<Input label="Password" type="password" />
<Input label="Username" description="Used in your public profile." />
<Input label="Email" error="This email is already taken." />
<Input label="Disabled" disabled />
```

| Prop | Type |
|---|---|
| `label` | `string` |
| `description` | `string` |
| `error` | `string` |
| `containerClassName` | `string` |
| `labelClassName` | `string` |

> Extends all native `<input>` HTML attributes.

---

### Textarea

```tsx
import { Textarea } from "@aghanim1206/ui-react";

<Textarea label="Message" placeholder="Write your message…" rows={4} />
<Textarea label="Bio" description="Max 160 characters." />
<Textarea label="Feedback" error="Required field." />
```

---

### Select

```tsx
import { Select } from "@aghanim1206/ui-react";

<Select
  label="Country"
  placeholder="Select a country"
  options={[
    { label: "France",        value: "fr" },
    { label: "Algeria",       value: "dz" },
    { label: "United States", value: "us" },
  ]}
/>

<Select label="Role" options={roles} error="Please select a role." />
<Select label="Status" options={statuses} isLoading />
```

---

### Checkbox & CheckboxGroup

```tsx
import { Checkbox, CheckboxGroup } from "@aghanim1206/ui-react";

// Single
<Checkbox label="I agree to the terms" />
<Checkbox label="Subscribe to newsletter" description="Receive weekly updates." />
<Checkbox label="Disabled option" disabled />
<Checkbox label="Accept terms" error="You must accept the terms." />

// Group
<CheckboxGroup
  label="Notifications"
  description="Choose what you want to be notified about."
  options={[
    { value: "email", label: "Email" },
    { value: "sms",   label: "SMS",   description: "Standard rates apply." },
    { value: "push",  label: "Push notifications" },
  ]}
  value={selected}
  onChange={setSelected}
```

---

### Radio & RadioGroup

```tsx
import { RadioGroup } from "@aghanim1206/ui-react";

<RadioGroup
  name="plan"
  label="Subscription plan"
  options={[
    { value: "free",  label: "Free",  description: "Up to 3 projects." },
    { value: "pro",   label: "Pro",   description: "Unlimited projects." },
    { value: "team",  label: "Team",  description: "Collaborative workspace." },
  ]}
  value={plan}
  onChange={setPlan}
/>
```

---

### Badge

```tsx
import { Badge } from "@aghanim1206/ui-react";

<Badge label="New" />
<Badge variant="primary"     label="Active" />
<Badge variant="outline"     label="Draft" />
<Badge variant="destructive" label="Deleted" />

// With icon
<Badge variant="primary" iconName="check" label="Verified" />
<Badge iconName="alertTriangle" label="Warning" size="lg" />
```

| Prop | Type | Default |
|---|---|---|
| `variant` | `default` \| `primary` \| `outline` \| `destructive` | `default` |
| `size` | `default` \| `sm` \| `lg` | `default` |
| `iconName` | `IconName` | — |
| `iconPosition` | `left` \| `right` | `left` |

---

### Toast

```tsx
import { ToastProvider, toast } from "@aghanim1206/ui-react";

// 1. Add ToastProvider near the root
<ToastProvider>
  <App />
</ToastProvider>

// 2. Trigger toasts anywhere
toast("Profile saved successfully.");

toast("File uploaded.", { type: "success", position: "bottom-right" });

toast("Something went wrong.", {
  type: "error",
  autoClose: false,
  description: "Please try again later.",
});

toast("Low disk space.", {
  type: "warning",
  position: "top-right",
  duration: 6000,
});
```

| Option | Type | Default |
|---|---|---|
| `type` | `default` \| `success` \| `warning` \| `error` | `default` |
| `position` | `top-left` \| `top-center` \| `top-right` \| `bottom-left` \| `bottom-center` \| `bottom-right` | `top-center` |
| `duration` | `number` (ms) | `3000` |
| `autoClose` | `boolean` | `true` |
| `description` | `string` | — |
| `iconName` | `IconName` | — |

---

### Tooltip

```tsx
import { Tooltip, Button } from "@aghanim1206/ui-react";

<Tooltip content="Save your changes">
  <Button size="icon" iconName="save" />
</Tooltip>

<Tooltip content="Opens in a new tab" position="right">
  <a href="/docs">Documentation</a>
</Tooltip>
```

| Prop | Type | Default |
|---|---|---|
| `content` | `string` | — |
| `position` | `top` \| `bottom` \| `left` \| `right` | `top` |

---

### Dialog

```tsx
import { Dialog } from "@aghanim1206/ui-react";

// With built-in trigger
<Dialog
  isOpen={open}
  onOpenChange={setOpen}
  trigger={<Button label="Open dialog" />}
>
  <Typography variant="h3">Confirm action</Typography>
  <Typography variant="p-sm" color="muted">Are you sure you want to proceed?</Typography>
  <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
    <Button variant="outline" label="Cancel" onClick={() => setOpen(false)} />
    <Button variant="primary" label="Confirm" onClick={() => setOpen(false)} />
  </div>
</Dialog>

// Controlled externally (no trigger)
<Dialog isOpen={open} onOpenChange={setOpen}>
  <Typography variant="h3">Edit profile</Typography>
  {/* … */}
</Dialog>

// Without overlay
<Dialog isOpen={open} onOpenChange={setOpen} showOverlay={false} trigger={<Button label="Open" />}>
  {/* … */}
</Dialog>
```

> Dialog is rendered in a **dedicated portal** (`document.body`) — it always sits on top of the page regardless of stacking contexts.

| Prop | Type | Default |
|---|---|---|
| `isOpen` | `boolean` | — |
| `onOpenChange` | `(open: boolean) => void` | — |
| `children` | `ReactNode` | — |
| `trigger` | `ReactNode` | — |
| `showOverlay` | `boolean` | `true` |
| `closeOnOverlayClick` | `boolean` | `true` |
| `closeOnEsc` | `boolean` | `true` |
| `closeButton` | `boolean` | `true` |
| `overlayClassName` | `string` | — |
| `contentClassName` | `string` | — |
| `closeButtonClassName` | `string` | — |

---

### Card

```tsx
import { Card } from "@aghanim1206/ui-react";

<Card>
  <p>Any content goes here.</p>
</Card>

// Combine with Tailwind
<Card className="flex flex-col gap-4">
  <Typography variant="h4">Order summary</Typography>
  {/* ... */}
</Card>
```

---

### Icon

```tsx
import { Icon } from "@aghanim1206/ui-react";

<Icon name="check" />
<Icon name="alertTriangle" size={20} />
<Icon name="spinner" className="animate-spin text-primary" />
```

> All available icon names are typed as `IconName` — your IDE will autocomplete them.

---

## Complete example — Dashboard page

```tsx
import {
  Button, Card, Input, Select, Badge,
  Typography, ToastProvider, toast,
  ThemeProvider, useTheme,
} from "@aghanim1206/ui-react";
import "@aghanim1206/ui-react/style.css";

function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-6 h-14 flex items-center justify-between">
        <span className="font-semibold text-foreground">AGH UI Demo</span>
        <div className="flex items-center gap-3">
          <Badge variant="primary" label="v0.2.1" size="sm" />
          <Button size="sm" variant="outline" label="Docs" iconName="externalLink" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-8 flex flex-col gap-6">
        <Typography variant="h2">New project</Typography>

        <Card className="flex flex-col gap-4">
          <Input label="Project name" placeholder="my-awesome-app" />
          <Input label="Repository URL" placeholder="https://github.com/…" />
          <Select
            label="Framework"
            placeholder="Choose a framework"
            options={[
              { label: "Next.js",  value: "next"  },
              { label: "Remix",    value: "remix" },
              { label: "Vite",     value: "vite"  },
            ]}
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" label="Cancel" />
            <Button
              variant="primary"
              label="Create project"
              iconName="plus"
              onClick={() => toast("Project created!", { type: "success" })}
            />
          </div>
        </Card>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" global>
      <ToastProvider>
        <DashboardPage />
      </ToastProvider>
    </ThemeProvider>
  );
}
```

---

## Design tokens reference

All tokens are available as CSS variables and as a typed TypeScript object (`tokens`).

### Colors

| Token | CSS Variable | Default value |
|---|---|---|
| Background | `--background` | `#f4f6f9` |
| Foreground | `--foreground` | `#1e293b` |
| Primary | `--primary` | `#2f669c` |
| Primary foreground | `--primary-foreground` | `#ffffff` |
| Muted | `--muted` | `#eef2f6` |
| Muted foreground | `--muted-foreground` | `#526173` |
| Destructive | `--destructive` | `#dc2626` |
| Border | `--border` | `#c9d3df` |
| Input | `--input` | `#526173` |
| Ring | `--ring` | `#2f669c` |

### Spacing

`--spacing-0` `--spacing-1` `--spacing-2` `--spacing-3` `--spacing-4` `--spacing-5` `--spacing-6` `--spacing-8` `--spacing-10` `--spacing-12` `--spacing-16`

### Border radius

`--radius-sm` `--radius-md` `--radius-lg` `--radius-xl` `--radius-2xl` `--radius-full`

### Typography

`--text-xs` `--text-sm` `--text-base` `--text-lg` `--text-xl` `--text-2xl` `--text-3xl` `--text-4xl` `--text-5xl`

Font weights: `--font-weight-normal` `--font-weight-medium` `--font-weight-semibold` `--font-weight-bold`

---

## Contributing

```bash
# Clone the repo
git clone https://github.com/aghanim1206/ui-react.git
cd ui-react

# Install dependencies
pnpm install

# Start Storybook
pnpm storybook

# Build the library
pnpm build
```

### Scripts

| Script | Purpose |
|---|---|
| `pnpm dev` | Run Vite dev server |
| `pnpm build` | Build the library to `dist/` |
| `pnpm storybook` | Run Storybook locally on port 6006 |
| `pnpm build-storybook` | Build static Storybook |
| `pnpm lint` | Run ESLint |

---

## Roadmap

- [ ] Dropdown Menu
- [ ] Combobox / Autocomplete
- [ ] Date Picker
- [ ] Tabs
- [ ] Accordion
- [ ] Table

---

## License

MIT © [Ahmed Ghanim](https://github.com/aghanim1206)

