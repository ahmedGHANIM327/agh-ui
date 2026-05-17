import type { Meta, StoryObj } from '@storybook/react-vite';
import Icon from "./Icon.tsx";

const meta: Meta<typeof Icon> = {
    title: "Icon",
    component: Icon,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        name: {
            control: "select"
        }
    },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
    args: {
        size: 36,
        name: 'x'
    },
};
