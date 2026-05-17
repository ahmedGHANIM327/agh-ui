# AGH UI

A modern, token-first React design system — built with **React**, **TypeScript**, **Vite**, **Storybook**, **CSS Variables**, and **BEM CSS**.

- Package: **`@aghanim1206/ui-react`**
- Documentation (Storybook): **https://agh-ui.shifaelib.com/**

---

## Key features

- **Token-first theming** via CSS variables (easy to override, no runtime dependency)
- **Accessible by default** (semantic HTML, keyboard support, focus states)
- **Consistent API** across components (predictable props, variants, sizing)
- **Modern DX**: TypeScript types, Vite-based build, Storybook documentation
- **BEM CSS architecture** with a clean, framework-friendly styling approach

---

## Installation

```bash
npm install @aghanim1206/ui-react
```

```bash
pnpm add @aghanim1206/ui-react
```

```bash
yarn add @aghanim1206/ui-react
```

---

## Basic usage

1) Import the CSS once (typically in your app entry: `main.tsx` / `index.tsx`).

```ts
import "@aghanim1206/ui-react/style.css";
```

2) Import and use components.

```tsx
import { Button, Input } from "@aghanim1206/ui-react";

export function Example() {
  return (
    <div>
      <Input label="Email" placeholder="name@domain.com" />
      <Button variant="primary">Continue</Button>
    </div>
  );
}
```

---

## Components

| Category | Components |
| --- | --- |
| Typography | `Typography` |
| Actions | `Button` |
| Feedback | `Badge`, `Spinner` |
| Layout | `Card` |
| Form fields | `Input`, `Textarea`, `Select` |
| Selection controls | `Checkbox`, `CheckboxGroup`, `Radio`, `RadioGroup` |
| Icons | `Icon` |

---

## Theming

AGH UI is themed with **CSS variables** (design tokens) defined in the shipped styles. You generally don’t theme components by overriding component CSS — you theme by overriding tokens.

### Tokens (example)

These are the core tokens you’ll typically customize:

- `--background`, `--foreground`
- `--primary`, `--primary-foreground`
- `--muted`, `--muted-foreground`
- `--border`, `--input`, `--ring`

### Light / Dark mode

Dark mode is enabled by adding the `.dark` class at a high level (usually on `html` or `body`).

```html
<html lang="en" class="dark">
  <!-- app -->
</html>
```

### Color themes (blue / green / purple)

Theme variants are applied via theme classes:

- Default (blue): no extra class (uses `:root` tokens)
- Green: `.theme-green`
- Purple: `.theme-purple`

You can combine a color theme with dark mode:

```html
<body class="theme-green dark">
  <!-- app -->
</body>
```

### Override a theme in your app

You can override tokens in your application CSS (or in a wrapper element) to create a custom theme.

```css
/* Example only — adapt for your app */
:root {
  --primary: #2f669c;
  --background: #f4f6f9;
}

/* Example only — if your app toggles a `.dark` class on a parent element */
/* .dark { ...token overrides... } */
```

---

## Documentation

Storybook is the source of truth for component usage, variants, states, and accessibility notes:

- **https://agh-ui.shifaelib.com/**

---

## Design principles

- **Token-first**: design decisions live in variables (color, spacing, radii, typography)
- **Accessible components**: semantic HTML, keyboard support, visible focus, sensible ARIA patterns
- **Consistent API**: predictable props, variants, and sizing across the system
- **Reusable React components**: composable building blocks for product UIs

---

## Example: Button + Input + Card

```tsx
import "@aghanim1206/ui-react/style.css";
import { Button, Card, Input, Typography } from "@aghanim1206/ui-react";

export function LoginCard() {
  return (
    <Card>
      <div style={{ display: "grid", gap: 12 }}>
        <div>
          <Typography variant="heading" as="h2">
            Sign in
          </Typography>
          <Typography variant="body" color="muted">
            Use your work email to continue.
          </Typography>
        </div>

        <Input label="Email" placeholder="name@company.com" />

        <Button fullWidth variant="primary">
          Continue
        </Button>
      </div>
    </Card>
  );
}
```

---

## Accessibility

AGH UI aims to provide accessible defaults:

- keyboard navigation support
- visible focus states (`:focus-visible`)
- disabled and error states
- labels, descriptions, and semantic markup where applicable

If you spot an accessibility issue, please open an issue with a minimal repro and expected behavior.

---

## Contributing

### Scripts

| Script | Purpose |
| --- | --- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Run local dev environment |
| `pnpm build` | Build the library |
| `pnpm storybook` | Run Storybook locally |
| `pnpm build-storybook` | Build static Storybook |

---

## Roadmap

Planned components and features:

- Modal / Dialog
- Toast
- Tooltip
- Dropdown
- Combobox
- AsyncSelect

---

## License

MIT © Ahmed Ghanim