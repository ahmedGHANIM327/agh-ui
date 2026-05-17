import type { HTMLAttributes, ReactNode } from "react";
import "./Typography.css";
type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "p-sm" | "p-xs" | "label";
type TypographyColor = "default" | "muted" | "primary" | "destructive";
interface TypographyProps extends HTMLAttributes<HTMLElement> {
    variant?: TypographyVariant;
    color?: TypographyColor;
    children: ReactNode;
}
declare const Typography: ({ variant, color, className, children, ...props }: TypographyProps) => import("react/jsx-runtime").JSX.Element;
export default Typography;
//# sourceMappingURL=Typography.d.ts.map