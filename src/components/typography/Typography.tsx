import type {
    ElementType,
    HTMLAttributes,
    ReactNode,
} from "react";

import styles from "./Typography.module.css";
const s = (cls: string): string => styles[cls] ?? '';

type TypographyVariant =
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "p-sm"
    | "p-xs"
    | "label";

type TypographyColor =
    | "default"
    | "muted"
    | "primary"
    | "destructive";

interface TypographyProps extends HTMLAttributes<HTMLElement> {
    variant?: TypographyVariant;
    color?: TypographyColor;
    children: ReactNode;
}

const defaultElements: Record<TypographyVariant, ElementType> = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    p: "p",
    "p-sm": "p",
    "p-xs": "p",
    label: "label",
};

const Typography = ({
                        variant = "p",
                        color = "default",
                        className = "",
                        children,
                        ...props
                    }: TypographyProps) => {
    const Component = defaultElements[variant];

    const classes = [
        s('typography'),
        s(`typography--${variant}`),
        s(`typography--color-${color}`),
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <Component
            className={classes}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Typography;