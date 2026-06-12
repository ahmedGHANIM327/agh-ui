import "./index.css";

export { default as Button } from "./components/button/Button";
export { default as Badge } from "./components/badge/Badge";
export { default as Card } from "./components/card/Card";
export { default as Input } from "./components/input/Input";
export { default as Textarea } from "./components/textarea/Textarea";
export { default as Checkbox } from "./components/checkbox/Checkbox";
export { default as CheckboxGroup } from "./components/checkbox/CheckboxGroup";
export { default as Radio } from "./components/radio/Radio";
export { default as RadioGroup } from "./components/radio/RadioGroup";
export { default as Select } from "./components/select/Select";
export { default as Typography } from "./components/typography/Typography";
export { default as Icon } from "./components/icon/Icon";
export {
    ToastProvider,
    toast
} from "./components/toast/Toast";
export { default as Tooltip } from "./components/tooltip/Tooltip";
export { default as Dialog } from "./components/dialog/Dialog";
export type { DialogProps } from "./components/dialog/Dialog";

// Theme
export { ThemeProvider, useTheme } from "./components/theme/ThemeProvider";
export type { ThemeProviderProps } from "./components/theme/ThemeProvider";

// Tokens CSS (pour usage avec style={{ }} ou dans un preset Tailwind)
export { tokens, themeClasses } from "./tokens";
export type { ThemeName } from "./tokens";

