import type { Meta, StoryObj } from "@storybook/react-vite";
import Accordion, { AccordionItem, AccordionTrigger, AccordionContent } from "./Accordion";
import type { AccordionProps } from "./Accordion";
import Input from "../input/Input";
import Button from "../button/Button";
import Badge from "../badge/Badge";
import { default as SwitchComp } from "../switch/Switch";

/* ── Meta ── */

const meta: Meta<typeof Accordion> = {
    title: "Accordion",
    component: Accordion,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Accordion is a compound component for showing and hiding sections of content. " +
                    "It supports `single` (one item open at a time) and `multiple` modes, three visual variants, " +
                    "and per-item or global custom icons. Compose with `AccordionItem`, `AccordionTrigger` and `AccordionContent`.",
            },
        },
    },

    args: {
        type: "single",
        variant: "default",
        defaultValue: "item-1",
        openIcon: "chevronDown",
        closeIcon: "chevronUp",
    },

    argTypes: {
        type: {
            control: "select",
            options: ["single", "multiple"],
            description: "`single` — only one item can be open at a time. `multiple` — any number of items can be open simultaneously.",
            table: {
                category: "Behavior",
                type: { summary: '"single" | "multiple"' },
                defaultValue: { summary: "single" },
            },
        },

        variant: {
            control: "select",
            options: ["default", "outline", "card"],
            description:
                "`default` — flat list with dividers. `outline` — single bordered container with internal dividers. `card` — each item is an independent card.",
            table: {
                category: "Appearance",
                type: { summary: '"default" | "outline" | "card"' },
                defaultValue: { summary: "default" },
            },
        },

        defaultValue: {
            control: "text",
            description: "Value(s) of the item(s) open by default (uncontrolled usage).",
            table: {
                category: "State",
                type: { summary: "string | string[]" },
            },
        },

        value: {
            control: false,
            description: "Controlled open value(s).",
            table: {
                category: "State",
                type: { summary: "string | string[]" },
            },
        },

        onValueChange: {
            action: "valueChanged",
            description: "Callback fired when the open item(s) change.",
            table: {
                category: "Events",
                type: { summary: "(value: string | string[]) => void" },
            },
        },

        openIcon: {
            control: "select",
            options: ["chevronDown", "chevronRight", "plus"],
            description: "Icon shown on the trigger when the item is **closed** (applies to all items unless overridden per-item).",
            table: {
                category: "Appearance",
                type: { summary: "IconName" },
                defaultValue: { summary: "chevronDown" },
            },
        },

        closeIcon: {
            control: "select",
            options: ["chevronUp", "chevronLeft", "x"],
            description: "Icon shown on the trigger when the item is **open** (applies to all items unless overridden per-item).",
            table: {
                category: "Appearance",
                type: { summary: "IconName" },
                defaultValue: { summary: "chevronUp" },
            },
        },

        className: {
            control: false,
            description: "Custom class applied to the Accordion root element.",
            table: {
                category: "Styling",
                type: { summary: "string" },
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

/* ── Rich content panels ── */

const divider: React.CSSProperties = {
    borderTop: "1px solid var(--border)",
    margin: "0.5rem 0",
};

const row: React.CSSProperties = {
    display: "flex",
    gap: "0.75rem",
    justifyContent: "flex-end",
    marginTop: "0.25rem",
};

const ProfilePanel = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Input label="Display name"  placeholder="Ahmed Ghanim" />
        <Input label="Email address" placeholder="ahmed@example.com" type="email" />
        <Input label="Website"       placeholder="https://example.com" type="url" />
        <div style={divider} />
        <div style={row}>
            <Button variant="outline" label={'Cancel'} size={'sm'}/>
            <Button label={'Save changes'} size={'sm'}/>
        </div>
    </div>
);

const SecurityPanel = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Input label="Current password" placeholder="••••••••" type="password" />
        <Input label="New password"     placeholder="••••••••" type="password"
               description="Minimum 8 characters, at least one number." />
        <Input label="Confirm password" placeholder="••••••••" type="password" />
        <div style={divider} />
        <SwitchComp
            variant="outline"
            label="Two-factor authentication"
            description="Receive a code via SMS each time you sign in."
        />
        <div style={row}>
            <Button label={'Update password'}/>
        </div>
    </div>
);

const BillingPanel = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: "var(--text-sm)", color: "var(--foreground)" }}>Pro Plan</p>
                <p style={{ margin: 0, fontSize: "var(--text-xs)", color: "var(--muted-foreground)" }}>
                    $12 / month · renews June 19, 2027
                </p>
            </div>
            <Badge variant="primary" label="Active" />
        </div>
        <div style={divider} />
        <Input label="Cardholder name" placeholder="Ahmed Ghanim" />
        <div style={{ display: "flex", gap: "0.75rem" }}>
            <Input label="Expiry" placeholder="MM / YY" />
            <Input label="CVC"    placeholder="123" />
        </div>
        <div style={row}>
            <Button variant="destructive" label={'Cancel subscription'}/>
            <Button label={'Update card'}/>
        </div>
    </div>
);

const NotificationsPanel = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <SwitchComp variant="outline" label="Email notifications"
            description="Receive account updates and announcements." defaultChecked />
        <SwitchComp variant="outline" label="Push notifications"
            description="Get alerts directly on your device." defaultChecked />
        <SwitchComp variant="outline" label="SMS alerts"
            description="Only for critical security events." />
        <SwitchComp variant="outline" label="Marketing emails"
            description="Hear about new features and special offers." />
        <div style={{ ...divider, marginTop: "0.5rem" }} />
        <div style={row}>
            <Button label={'Save preferences'}/>
        </div>
    </div>
);

const ITEMS = [
    { value: "profile",       label: "Profile",       panel: <ProfilePanel /> },
    { value: "security",      label: "Security",      panel: <SecurityPanel /> },
    { value: "billing",       label: "Billing",       panel: <BillingPanel /> },
    { value: "notifications", label: "Notifications", panel: <NotificationsPanel /> },
];

/* ── Stories ── */

export const Playground: Story = {
    render: (args: AccordionProps) => (
        <div style={{ width: "32rem" }}>
            <Accordion {...args}>
                {ITEMS.map(({ value, label, panel }) => (
                    <AccordionItem key={value} value={value}>
                        <AccordionTrigger>{label}</AccordionTrigger>
                        <AccordionContent>{panel}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    ),
};

export const DefaultVariant: Story = {
    name: "Default variant",
    render: () => (
        <div style={{ width: "32rem" }}>
            <Accordion defaultValue="profile" variant="default">
                {ITEMS.map(({ value, label, panel }) => (
                    <AccordionItem key={value} value={value}>
                        <AccordionTrigger>{label}</AccordionTrigger>
                        <AccordionContent>{panel}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    ),
};

export const OutlineVariant: Story = {
    name: "Outline variant",
    render: () => (
        <div style={{ width: "32rem" }}>
            <Accordion defaultValue="profile" variant="outline">
                {ITEMS.map(({ value, label, panel }) => (
                    <AccordionItem key={value} value={value}>
                        <AccordionTrigger>{label}</AccordionTrigger>
                        <AccordionContent>{panel}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    ),
};

export const CardVariant: Story = {
    name: "Card variant",
    render: () => (
        <div style={{ width: "32rem" }}>
            <Accordion defaultValue="profile" variant="card">
                {ITEMS.map(({ value, label, panel }) => (
                    <AccordionItem key={value} value={value}>
                        <AccordionTrigger>{label}</AccordionTrigger>
                        <AccordionContent>{panel}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    ),
};

export const MultipleType: Story = {
    name: "Multiple — several items open at once",
    render: () => (
        <div style={{ width: "32rem" }}>
            <Accordion type="multiple" defaultValue={["profile", "notifications"]} variant="outline">
                {ITEMS.map(({ value, label, panel }) => (
                    <AccordionItem key={value} value={value}>
                        <AccordionTrigger>{label}</AccordionTrigger>
                        <AccordionContent>{panel}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    ),
};

export const WithDisabledItem: Story = {
    name: "With disabled item",
    render: () => (
        <div style={{ width: "32rem" }}>
            <Accordion defaultValue="profile" variant="outline">
                <AccordionItem value="profile">
                    <AccordionTrigger>Profile</AccordionTrigger>
                    <AccordionContent><ProfilePanel /></AccordionContent>
                </AccordionItem>
                <AccordionItem value="security" disabled>
                    <AccordionTrigger>Security</AccordionTrigger>
                    <AccordionContent><SecurityPanel /></AccordionContent>
                </AccordionItem>
                <AccordionItem value="billing">
                    <AccordionTrigger>Billing</AccordionTrigger>
                    <AccordionContent><BillingPanel /></AccordionContent>
                </AccordionItem>
                <AccordionItem value="notifications">
                    <AccordionTrigger>Notifications</AccordionTrigger>
                    <AccordionContent><NotificationsPanel /></AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    ),
};

export const CustomIcons: Story = {
    name: "Custom icons (plus / x)",
    render: () => (
        <div style={{ width: "32rem" }}>
            <Accordion defaultValue="profile" variant="card" openIcon="plus" closeIcon="x">
                {ITEMS.map(({ value, label, panel }) => (
                    <AccordionItem key={value} value={value}>
                        <AccordionTrigger>{label}</AccordionTrigger>
                        <AccordionContent>{panel}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    ),
};

export const PerItemIcons: Story = {
    name: "Per-item custom icons",
    render: () => (
        <div style={{ width: "32rem" }}>
            <Accordion defaultValue="profile" variant="outline">
                <AccordionItem value="profile" openIcon="chevronRight" closeIcon="chevronDown">
                    <AccordionTrigger>Profile</AccordionTrigger>
                    <AccordionContent><ProfilePanel /></AccordionContent>
                </AccordionItem>
                <AccordionItem value="security" openIcon="plus" closeIcon="x">
                    <AccordionTrigger>Security</AccordionTrigger>
                    <AccordionContent><SecurityPanel /></AccordionContent>
                </AccordionItem>
                <AccordionItem value="billing">
                    <AccordionTrigger>Billing (default icons)</AccordionTrigger>
                    <AccordionContent><BillingPanel /></AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    ),
};

export const AllVariants: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem", width: "32rem" }}>
            {(["default", "outline", "card"] as const).map(variant => (
                <div key={variant}>
                    <p style={{ fontSize: "var(--text-xs)", color: "var(--muted-foreground)", marginBottom: "0.75rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {variant}
                    </p>
                    <Accordion variant={variant} defaultValue="profile">
                        <AccordionItem value="profile">
                            <AccordionTrigger>Profile</AccordionTrigger>
                            <AccordionContent><ProfilePanel /></AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="security">
                            <AccordionTrigger>Security</AccordionTrigger>
                            <AccordionContent><SecurityPanel /></AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="billing">
                            <AccordionTrigger>Billing</AccordionTrigger>
                            <AccordionContent><BillingPanel /></AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            ))}
        </div>
    ),
};

/* ── RTL panels (Arabic) ── */

const ProfilePanelRTL = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Input label="الاسم الكامل"        placeholder="أحمد غانم" />
        <Input label="البريد الإلكتروني"   placeholder="ahmed@example.com" type="email" />
        <Input label="الموقع الإلكتروني"   placeholder="https://example.com" type="url" />
        <div style={divider} />
        <div style={{ ...row, justifyContent: "flex-start" }}>
            <Button label="حفظ التغييرات" size="sm" />
            <Button variant="outline" label="إلغاء" size="sm" />
        </div>
    </div>
);

const SecurityPanelRTL = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Input label="كلمة المرور الحالية" placeholder="••••••••" type="password" />
        <Input label="كلمة المرور الجديدة" placeholder="••••••••" type="password"
               description="8 أحرف على الأقل، بما فيها رقم واحد." />
        <Input label="تأكيد كلمة المرور"   placeholder="••••••••" type="password" />
        <div style={divider} />
        <SwitchComp
            variant="outline"
            label="المصادقة الثنائية"
            description="ستتلقى رمزاً عبر الرسائل القصيرة عند كل تسجيل دخول."
        />
        <div style={{ ...row, justifyContent: "flex-start" }}>
            <Button label="تحديث كلمة المرور" />
        </div>
    </div>
);

const NotificationsPanelRTL = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <SwitchComp variant="outline" label="إشعارات البريد الإلكتروني"
            description="تلقّي تحديثات الحساب والإعلانات." defaultChecked />
        <SwitchComp variant="outline" label="الإشعارات الفورية"
            description="احصل على التنبيهات مباشرةً على جهازك." defaultChecked />
        <SwitchComp variant="outline" label="تنبيهات الرسائل القصيرة"
            description="للأحداث الأمنية الحرجة فقط." />
        <SwitchComp variant="outline" label="رسائل تسويقية"
            description="اطّلع على أحدث الميزات والعروض الخاصة." />
        <div style={{ ...divider, marginTop: "0.5rem" }} />
        <div style={{ ...row, justifyContent: "flex-start" }}>
            <Button label="حفظ التفضيلات" />
        </div>
    </div>
);

const BillingPanelRTL = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: "var(--text-sm)", color: "var(--foreground)" }}>الخطة الاحترافية</p>
                <p style={{ margin: 0, fontSize: "var(--text-xs)", color: "var(--muted-foreground)" }}>
                    12 دولار / شهرياً · يتجدد في 19 يونيو 2027
                </p>
            </div>
            <Badge variant="primary" label="نشط" />
        </div>
        <div style={divider} />
        <Input label="اسم حامل البطاقة" placeholder="أحمد غانم" />
        <div style={{ display: "flex", gap: "0.75rem" }}>
            <Input label="تاريخ الانتهاء" placeholder="MM / YY" />
            <Input label="رمز الأمان" placeholder="123" />
        </div>
        <div style={{ ...row, justifyContent: "flex-start" }}>
            <Button label="تحديث البطاقة" />
            <Button variant="destructive" label="إلغاء الاشتراك" />
        </div>
    </div>
);

const RTL_ITEMS = [
    { value: "profile",       label: "الملف الشخصي", panel: <ProfilePanelRTL /> },
    { value: "security",      label: "الأمان",        panel: <SecurityPanelRTL /> },
    { value: "billing",       label: "الفواتير",      panel: <BillingPanelRTL /> },
    { value: "notifications", label: "الإشعارات",     panel: <NotificationsPanelRTL /> },
];

export const RTL: Story = {
    name: "RTL — Arabic",
    parameters: {
        docs: {
            description: {
                story: "Right-to-left layout for Arabic and other RTL languages. Set `dir=\"rtl\"` on the container — the accordion, triggers, icons and all inner content mirror automatically.",
            },
        },
    },
    render: () => (
        <div dir="rtl" lang="ar" style={{ width: "32rem", fontFamily: "var(--font-sans)" }}>
            <Accordion defaultValue="profile" variant="outline">
                {RTL_ITEMS.map(({ value, label, panel }) => (
                    <AccordionItem key={value} value={value}>
                        <AccordionTrigger>{label}</AccordionTrigger>
                        <AccordionContent>{panel}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    ),
};

export const RTLAllVariants: Story = {
    name: "RTL — All variants",
    parameters: {
        docs: {
            description: {
                story: "All three visual variants rendered in RTL mode.",
            },
        },
    },
    render: () => (
        <div dir="rtl" lang="ar" style={{ display: "flex", flexDirection: "column", gap: "3rem", width: "32rem", fontFamily: "var(--font-sans)" }}>
            {(["default", "outline", "card"] as const).map(variant => (
                <div key={variant}>
                    <p style={{ fontSize: "var(--text-xs)", color: "var(--muted-foreground)", marginBottom: "0.75rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {variant}
                    </p>
                    <Accordion variant={variant} defaultValue="profile">
                        {RTL_ITEMS.slice(0, 3).map(({ value, label, panel }) => (
                            <AccordionItem key={value} value={value}>
                                <AccordionTrigger>{label}</AccordionTrigger>
                                <AccordionContent>{panel}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            ))}
        </div>
    ),
};


