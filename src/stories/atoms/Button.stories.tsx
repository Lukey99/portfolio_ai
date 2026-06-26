import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/atoms/Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary'] },
    children: { control: 'text' },
    href: { control: 'text' },
    target: { control: 'select', options: ['_self', '_blank'] },
    onClick: { table: { disable: true } },
  },
  args: {
    variant: 'primary',
    children: 'Voir mon parcours →',
    href: '#',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary', children: 'Voir mon parcours →' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Me contacter' },
};

export const AsButton: Story = {
  args: { variant: 'primary', children: 'Action', href: undefined },
  render: args => <Button {...args} onClick={() => {}} />,
};

export const ExternalLink: Story = {
  args: {
    variant: 'secondary',
    children: 'GitHub ↗',
    href: 'https://github.com',
    target: '_blank',
  },
};
