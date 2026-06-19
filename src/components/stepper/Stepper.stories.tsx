import type { Meta, StoryObj } from "@storybook/react-vite";
import Stepper, { Step } from "./Stepper";
import type { StepperProps } from "./Stepper";
import Icon from "../icon/Icon";

const meta: Meta<typeof Stepper> = {
    title: "Stepper",
    component: Stepper,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Stepper is a compound component for guiding users through a multi-step process. " +
                    "The connecting line between steps turns primary once the following step is reached. " +
                    "Compose with `Step` children. Each `Step` accepts an optional `step` prop for a custom badge (number, string, or JSX); " +
                    "when omitted a dot is shown for upcoming steps and a check icon for attended ones.",
            },
        },
    },

    args: {
        current: 1,
        direction: "horizontal",
    },

    argTypes: {
        current: {
            control: { type: "number", min: 0, max: 3 },
            description: "0-based index of the currently active step.",
            table: {
                category: "State",
                type: { summary: "number" },
            },
        },
        direction: {
            control: "select",
            options: ["horizontal", "vertical"],
            description: "Layout direction of the stepper.",
            table: {
                category: "Appearance",
                type: { summary: '"horizontal" | "vertical"' },
                defaultValue: { summary: "horizontal" },
            },
        },
        className: {
            control: false,
            table: { category: "Styling", type: { summary: "string" } },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Stepper>;

/* ── Shared step data ── */

const STEPS = [
    { title: "Create Account",  description: "Enter your email and password." },
    { title: "Verify Email",    description: "Check your inbox for the code." },
    { title: "Set Up Profile",  description: "Personalize your experience." },
    { title: "All Done",        description: "You're ready to get started!" },
];

const STEPS_AR = [
    { title: "إنشاء الحساب",              description: "أدخل بريدك الإلكتروني وكلمة المرور." },
    { title: "التحقق من البريد الإلكتروني", description: "تحقق من صندوق الوارد للحصول على الرمز." },
    { title: "إعداد الملف الشخصي",        description: "خصّص تجربتك." },
    { title: "تم",                         description: "أنت مستعد للبدء!" },
];

/* ── Stories ── */

export const Playground: Story = {
    render: (args: StepperProps) => (
        <div style={{ width: args.direction === "vertical" ? "20rem" : "36rem" }}>
            <Stepper {...args}>
                {STEPS.map((s, i) => (
                    <Step key={i} title={s.title} description={s.description} />
                ))}
            </Stepper>
        </div>
    ),
};

export const HorizontalDefault: Story = {
    name: "Horizontal — default badges",
    render: () => (
        <div style={{ width: "36rem" }}>
            <Stepper current={1} direction="horizontal">
                {STEPS.map((s, i) => (
                    <Step key={i} title={s.title} description={s.description} />
                ))}
            </Stepper>
        </div>
    ),
};

export const VerticalDefault: Story = {
    name: "Vertical — default badges",
    render: () => (
        <div style={{ width: "20rem" }}>
            <Stepper current={1} direction="vertical">
                {STEPS.map((s, i) => (
                    <Step key={i} title={s.title} description={s.description} />
                ))}
            </Stepper>
        </div>
    ),
};

export const WithNumbers: Story = {
    name: "Custom badge — numbers",
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            <Stepper current={2} direction="horizontal">
                {STEPS.map((s, i) => (
                    <Step key={i} title={s.title} description={s.description} step={i + 1} />
                ))}
            </Stepper>
            <Stepper current={2} direction="vertical" >
                {STEPS.map((s, i) => (
                    <Step key={i} title={s.title} description={s.description} step={i + 1} />
                ))}
            </Stepper>
        </div>
    ),
};

export const WithIcons: Story = {
    name: "Custom badge — icons",
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            <Stepper current={2} direction="horizontal">
                <Step title="Account"      description="Enter your credentials."  step={<Icon name="user"     size={14} />} />
                <Step title="Security"     description="Set up 2FA."              step={<Icon name="settings" size={14} />} />
                <Step title="Profile"      description="Add your details."        step={<Icon name="edit"     size={14} />} />
                <Step title="Finish"       description="You're all set."          step={<Icon name="check"    size={14} />} />
            </Stepper>
            <Stepper current={2} direction="vertical">
                <Step title="Account"      description="Enter your credentials."  step={<Icon name="user"     size={14} />} />
                <Step title="Security"     description="Set up 2FA."              step={<Icon name="settings" size={14} />} />
                <Step title="Profile"      description="Add your details."        step={<Icon name="edit"     size={14} />} />
                <Step title="Finish"       description="You're all set."          step={<Icon name="check"    size={14} />} />
            </Stepper>
        </div>
    ),
};

export const FirstStep: Story = {
    name: "State — first step active",
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            <Stepper current={0} direction="horizontal">
                {STEPS.map((s, i) => <Step key={i} title={s.title} description={s.description} />)}
            </Stepper>
            <Stepper current={0} direction="vertical">
                {STEPS.map((s, i) => <Step key={i} title={s.title} description={s.description} />)}
            </Stepper>
        </div>
    ),
};

export const LastStep: Story = {
    name: "State — last step active",
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            <Stepper current={3} direction="horizontal">
                {STEPS.map((s, i) => <Step key={i} title={s.title} description={s.description} />)}
            </Stepper>
            <Stepper current={3} direction="vertical">
                {STEPS.map((s, i) => <Step key={i} title={s.title} description={s.description} />)}
            </Stepper>
        </div>
    ),
};

export const AllCompleted: Story = {
    name: "State — all completed",
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            <Stepper current={4} direction="horizontal">
                {STEPS.map((s, i) => <Step key={i} title={s.title} description={s.description} />)}
            </Stepper>
            <Stepper current={4} direction="vertical">
                {STEPS.map((s, i) => <Step key={i} title={s.title} description={s.description} />)}
            </Stepper>
        </div>
    ),
};

export const RTL: Story = {
    name: "RTL — Arabic",
    parameters: {
        docs: {
            description: {
                story:
                    "Right-to-left layout. Set `dir=\"rtl\"` on the container — the badge track, connector and text mirror automatically thanks to logical CSS properties.",
            },
        },
    },
    render: () => (
        <div dir="rtl" lang="ar" style={{ display: "flex", flexDirection: "column", gap: "3rem", fontFamily: "var(--font-sans)" }}>
            {/* Horizontal RTL */}
            <div>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--muted-foreground)", marginBottom: "0.75rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    horizontal
                </p>
                <div style={{ width: "36rem" }}>
                    <Stepper current={1} direction="horizontal">
                        {STEPS_AR.map((s, i) => (
                            <Step key={i} title={s.title} description={s.description} />
                        ))}
                    </Stepper>
                </div>
            </div>

            {/* Horizontal RTL with numbers */}
            <div>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--muted-foreground)", marginBottom: "0.75rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    horizontal — numbers
                </p>
                <div style={{ width: "36rem" }}>
                    <Stepper current={2} direction="horizontal">
                        {STEPS_AR.map((s, i) => (
                            <Step key={i} title={s.title} description={s.description} step={i + 1} />
                        ))}
                    </Stepper>
                </div>
            </div>

            {/* Vertical RTL */}
            <div>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--muted-foreground)", marginBottom: "0.75rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    vertical
                </p>
                <div style={{ width: "20rem" }}>
                    <Stepper current={1} direction="vertical">
                        {STEPS_AR.map((s, i) => (
                            <Step key={i} title={s.title} description={s.description} />
                        ))}
                    </Stepper>
                </div>
            </div>
        </div>
    ),
};
