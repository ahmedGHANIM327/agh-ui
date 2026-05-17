import type { HTMLAttributes, ReactNode } from "react";
import "./Card.css";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const Card = ({
                  children,
                  className = "",
                  ...props
              }: CardProps) => {
    const classes = [
        "card",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div
            className={classes}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;