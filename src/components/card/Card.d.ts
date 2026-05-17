import type { HTMLAttributes, ReactNode } from "react";
import "./Card.css";
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
declare const Card: ({ children, className, ...props }: CardProps) => import("react/jsx-runtime").JSX.Element;
export default Card;
//# sourceMappingURL=Card.d.ts.map