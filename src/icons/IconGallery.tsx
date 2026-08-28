import {IconRegistry} from "./IconRegistry.ts";

export const IconGallery = () => {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                gap: "12px",
            }}
        >
            {Object.entries(IconRegistry).map(([name, Icon]) => (
                <div
                    key={name}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "12px",
                        minHeight: "100px",
                        padding: "16px",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-lg)",
                        background: "var(--background)",
                    }}
                >
                    <Icon
                        size={24}
                        color="var(--foreground)"
                    />

                    <code
                        style={{
                            fontSize: "12px",
                            color: "var(--muted-foreground)",
                        }}
                    >
                        {name}
                    </code>
                </div>
            ))}
        </div>
    );
};