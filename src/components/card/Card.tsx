import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Card.module.css";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const Card = ({
                  children,
                  className = "",
                  ...props
              }: CardProps) => {
    const classes = [
        className,
        styles.card
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