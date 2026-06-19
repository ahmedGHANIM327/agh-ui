import type { Meta, StoryObj } from "@storybook/react-vite";
import Tabs, { TabsList, TabsTrigger, TabsContent } from "./Tabs";
import type { TabsProps } from "./Tabs";
import Input from "../input/Input";
import { default as SwitchComp } from "../switch/Switch";
import Badge from "../badge/Badge";
import Button from "../button/Button";

const meta: Meta<typeof Tabs> = {
    title: "Tabs",
    component: Tabs,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Tabs is a compound component for switching between sections of related content. It supports two variants (`default` pill-style and `line` underline) and two orientations (`horizontal` and `vertical`). Compose with `TabsList`, `TabsTrigger` and `TabsContent`.",
            },
        },
    },

    args: {
        defaultValue: "account",
        variant: "default",
        orientation: "horizontal",
    },

    argTypes: {
        variant: {
            control: "select",
            options: ["default", "line"],
            description:
                "`default` — pill-style triggers on a muted bar. `line` — minimal triggers with a sliding primary underline.",
            table: {
                category: "Appearance",
                type: { summary: '"default" | "line"' },
                defaultValue: { summary: "default" },
            },
        },

        orientation: {
            control: "select",
            options: ["horizontal", "vertical"],
            description: "Layout direction of the triggers list.",
            table: {
                category: "Appearance",
                type: { summary: '"horizontal" | "vertical"' },
                defaultValue: { summary: "horizontal" },
            },
        },

        defaultValue: {
            control: "text",
            description: "Initial active tab value for uncontrolled usage.",
            table: {
                category: "State",
                type: { summary: "string" },
            },
        },

        value: {
            control: "text",
            description: "Controlled active tab value.",
            table: {
                category: "State",
                type: { summary: "string" },
            },
        },

        onValueChange: {
            action: "valueChanged",
            description: "Callback fired when the active tab changes.",
            table: {
                category: "Events",
                type: { summary: "(value: string) => void" },
            },
        },

        className: {
            control: false,
            description: "Custom class applied to the Tabs root element.",
            table: {
                category: "Styling",
                type: { summary: "string" },
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

/* ── Rich panel components ── */

const card: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
};

const row: React.CSSProperties = {
    display: "flex",
    gap: "0.75rem",
    justifyContent: "flex-end",
};

const divider: React.CSSProperties = {
    borderTop: "1px solid var(--border)",
    margin: "0.25rem 0",
};

const AccountPanel = () => (
    <div style={card}>
        <Input label="Display name"    placeholder="Ahmed Ghanim" />
        <Input label="Email address"   placeholder="ahmed@example.com" type="email" />
        <Input label="Website"         placeholder="https://example.com" type="url" />
        <div style={divider} />
        <div style={row}>
            <Button variant="outline" label={'Cancel'} />
            <Button label={'Save changes'}/>
        </div>
    </div>
);

const SecurityPanel = () => (
    <div style={card}>
        <Input label="Current password" placeholder="••••••••" type="password" />
        <Input label="New password"     placeholder="••••••••" type="password" />
        <Input label="Confirm password" placeholder="••••••••" type="password"
               description="Minimum 8 characters, at least one number." />
        <div style={divider} />
        <SwitchComp
            variant="outline"
            label="Two-factor authentication"
            description="Add an extra layer of security to your account."
        />
        <div style={row}>
            <Button variant="outline" label={'Cancel'} />
            <Button label={'Update password'}/>
        </div>
    </div>
);

const BillingPanel = () => (
    <div style={card}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: "var(--text-sm)", color: "var(--foreground)" }}>Pro Plan</p>
                <p style={{ margin: 0, fontSize: "var(--text-xs)", color: "var(--muted-foreground)" }}>
                    Billed monthly · next renewal June 19, 2027
                </p>
            </div>
            <Badge variant="primary" label="Active" />
        </div>
        <div style={divider} />
        <Input label="Cardholder name"  placeholder="Ahmed Ghanim" />
        <Input label="Card number"      placeholder="4242 4242 4242 4242" />
        <div style={{ display: "flex", gap: "0.75rem" }}>
            <Input label="Expiry" placeholder="MM / YY" />
            <Input label="CVC"    placeholder="123" />
        </div>
        <div style={divider} />
        <div style={row}>
            <Button variant="destructive" label={'Cancel subscription'}/>
            <Button label={'Update payment'}/>
        </div>
    </div>
);

const NotificationsPanel = () => (
    <div style={card}>
        <SwitchComp variant="outline" label="Email notifications"
            description="Receive account updates and announcements." defaultChecked />
        <SwitchComp variant="outline" label="Push notifications"
            description="Get alerts directly on your device." defaultChecked />
        <SwitchComp variant="outline" label="SMS alerts"
            description="Only for critical security events." />
        <SwitchComp variant="outline" label="Marketing emails"
            description="Hear about new features and special offers." />
        <div style={divider} />
        <div style={row}>
            <Button label={'Save preferences'}/>
        </div>
    </div>
);

const TABS = [
    { value: "account",       label: "Account",       panel: <AccountPanel /> },
    { value: "security",      label: "Security",      panel: <SecurityPanel /> },
    { value: "billing",       label: "Billing",       panel: <BillingPanel /> },
    { value: "notifications", label: "Notifications", panel: <NotificationsPanel /> },
];

/* ── Stories ── */

export const Playground: Story = {
    render: (args: TabsProps) => (
        <div style={{ width: "32rem" }}>
            <Tabs {...args}>
                <TabsList>
                    {TABS.map(t => (
                        <TabsTrigger key={t.value} value={t.value}>
                            {t.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {TABS.map(t => (
                    <TabsContent key={t.value} value={t.value}>
                        {t.panel}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    ),
};

export const DefaultHorizontal: Story = {
    name: "Default — Horizontal",
    render: () => (
        <div style={{ width: "32rem" }}>
            <Tabs defaultValue="account" variant="default" orientation="horizontal">
                <TabsList>
                    {TABS.map(t => (
                        <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
                    ))}
                </TabsList>
                {TABS.map(t => (
                    <TabsContent key={t.value} value={t.value}>
                        {t.panel}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    ),
};

export const DefaultVertical: Story = {
    name: "Default — Vertical",
    render: () => (
        <div style={{ width: "40rem" }}>
            <Tabs defaultValue="account" variant="default" orientation="vertical">
                <TabsList>
                    {TABS.map(t => (
                        <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
                    ))}
                </TabsList>
                {TABS.map(t => (
                    <TabsContent key={t.value} value={t.value}>
                        {t.panel}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    ),
};

export const LineHorizontal: Story = {
    name: "Line — Horizontal",
    render: () => (
        <div style={{ width: "32rem" }}>
            <Tabs defaultValue="account" variant="line" orientation="horizontal">
                <TabsList>
                    {TABS.map(t => (
                        <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
                    ))}
                </TabsList>
                {TABS.map(t => (
                    <TabsContent key={t.value} value={t.value}>
                        {t.panel}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    ),
};

export const LineVertical: Story = {
    name: "Line — Vertical",
    render: () => (
        <div style={{ width: "40rem" }}>
            <Tabs defaultValue="account" variant="line" orientation="vertical">
                <TabsList>
                    {TABS.map(t => (
                        <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
                    ))}
                </TabsList>
                {TABS.map(t => (
                    <TabsContent key={t.value} value={t.value}>
                        {t.panel}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    ),
};

export const WithDisabledTab: Story = {
    name: "With Disabled Tab",
    render: () => (
        <div style={{ width: "32rem" }}>
            <Tabs defaultValue="account" variant="default" orientation="horizontal">
                <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="billing" disabled>Billing</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>
                <TabsContent value="account"><AccountPanel /></TabsContent>
                <TabsContent value="security"><SecurityPanel /></TabsContent>
                <TabsContent value="billing"><BillingPanel /></TabsContent>
                <TabsContent value="notifications"><NotificationsPanel /></TabsContent>
            </Tabs>
        </div>
    ),
};

export const AllVariants: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem", width: "32rem" }}>
            <div>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--muted-foreground)", marginBottom: "0.75rem", fontWeight: 500 }}>
                    DEFAULT · HORIZONTAL
                </p>
                <Tabs defaultValue="account" variant="default" orientation="horizontal">
                    <TabsList>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                        <TabsTrigger value="billing">Billing</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account"><AccountPanel /></TabsContent>
                    <TabsContent value="security"><SecurityPanel /></TabsContent>
                    <TabsContent value="billing"><BillingPanel /></TabsContent>
                </Tabs>
            </div>

            <div>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--muted-foreground)", marginBottom: "0.75rem", fontWeight: 500 }}>
                    LINE · HORIZONTAL
                </p>
                <Tabs defaultValue="account" variant="line" orientation="horizontal">
                    <TabsList>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                        <TabsTrigger value="billing">Billing</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account"><AccountPanel /></TabsContent>
                    <TabsContent value="security"><SecurityPanel /></TabsContent>
                    <TabsContent value="billing"><BillingPanel /></TabsContent>
                </Tabs>
            </div>
        </div>
    ),
};

/* ── RTL panels (Arabic) ── */

const AccountPanelRTL = () => (
    <div style={card}>
        <Input label="الاسم الكامل"        placeholder="أحمد غانم" />
        <Input label="البريد الإلكتروني"   placeholder="ahmed@example.com" type="email" />
        <Input label="الموقع الإلكتروني"   placeholder="https://example.com" type="url" />
        <div style={divider} />
        <div style={{ ...row, justifyContent: "flex-start" }}>
            <Button label="حفظ التغييرات" />
            <Button variant="outline" label="إلغاء" />
        </div>
    </div>
);

const SecurityPanelRTL = () => (
    <div style={card}>
        <Input label="كلمة المرور الحالية" placeholder="••••••••" type="password" />
        <Input label="كلمة المرور الجديدة" placeholder="••••••••" type="password" />
        <Input label="تأكيد كلمة المرور"   placeholder="••••••••" type="password"
               description="8 أحرف على الأقل، بما فيها رقم واحد." />
        <div style={divider} />
        <SwitchComp
            variant="outline"
            label="المصادقة الثنائية"
            description="ستتلقى رمزاً عبر الرسائل القصيرة عند كل تسجيل دخول."
        />
        <div style={{ ...row, justifyContent: "flex-start" }}>
            <Button label="تحديث كلمة المرور" />
            <Button variant="outline" label="إلغاء" />
        </div>
    </div>
);

const BillingPanelRTL = () => (
    <div style={card}>
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
        <Input label="رقم البطاقة"       placeholder="4242 4242 4242 4242" />
        <div style={{ display: "flex", gap: "0.75rem" }}>
            <Input label="تاريخ الانتهاء" placeholder="MM / YY" />
            <Input label="رمز الأمان"     placeholder="123" />
        </div>
        <div style={divider} />
        <div style={{ ...row, justifyContent: "flex-start" }}>
            <Button label="تحديث الدفع" />
            <Button variant="destructive" label="إلغاء الاشتراك" />
        </div>
    </div>
);

const NotificationsPanelRTL = () => (
    <div style={card}>
        <SwitchComp variant="outline" label="إشعارات البريد الإلكتروني"
            description="تلقّي تحديثات الحساب والإعلانات." defaultChecked />
        <SwitchComp variant="outline" label="الإشعارات الفورية"
            description="احصل على التنبيهات مباشرةً على جهازك." defaultChecked />
        <SwitchComp variant="outline" label="تنبيهات الرسائل القصيرة"
            description="للأحداث الأمنية الحرجة فقط." />
        <SwitchComp variant="outline" label="رسائل تسويقية"
            description="اطّلع على أحدث الميزات والعروض الخاصة." />
        <div style={divider} />
        <div style={{ ...row, justifyContent: "flex-start" }}>
            <Button label="حفظ التفضيلات" />
        </div>
    </div>
);

const RTL_TABS = [
    { value: "account",       label: "الحساب",       panel: <AccountPanelRTL /> },
    { value: "security",      label: "الأمان",        panel: <SecurityPanelRTL /> },
    { value: "billing",       label: "الفواتير",      panel: <BillingPanelRTL /> },
    { value: "notifications", label: "الإشعارات",     panel: <NotificationsPanelRTL /> },
];

export const RTL: Story = {
    name: "RTL — Arabic",
    parameters: {
        docs: {
            description: {
                story: "Right-to-left layout for Arabic and other RTL languages. Set `dir=\"rtl\"` on the container — the tabs list, triggers and all inner content mirror automatically.",
            },
        },
    },
    render: () => (
        <div dir="rtl" lang="ar" style={{ width: "32rem", fontFamily: "var(--font-sans)" }}>
            <Tabs defaultValue="account" variant="default" orientation="horizontal">
                <TabsList>
                    {RTL_TABS.map(t => (
                        <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
                    ))}
                </TabsList>
                {RTL_TABS.map(t => (
                    <TabsContent key={t.value} value={t.value}>
                        {t.panel}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    ),
};

export const RTLAllVariants: Story = {
    name: "RTL — All variants",
    parameters: {
        docs: {
            description: {
                story: "Both visual variants (`default` and `line`) rendered in RTL mode.",
            },
        },
    },
    render: () => (
        <div dir="rtl" lang="ar" style={{ display: "flex", flexDirection: "column", gap: "3rem", width: "32rem", fontFamily: "var(--font-sans)" }}>
            {(["default", "line"] as const).map(variant => (
                <div key={variant}>
                    <p style={{ fontSize: "var(--text-xs)", color: "var(--muted-foreground)", marginBottom: "0.75rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {variant}
                    </p>
                    <Tabs defaultValue="account" variant={variant} orientation="horizontal">
                        <TabsList>
                            {RTL_TABS.slice(0, 3).map(t => (
                                <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
                            ))}
                        </TabsList>
                        {RTL_TABS.slice(0, 3).map(t => (
                            <TabsContent key={t.value} value={t.value}>
                                {t.panel}
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            ))}
        </div>
    ),
};

