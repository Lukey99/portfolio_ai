import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@/components/atoms/Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    variant: { control: 'select', options: ['accent', 'cyan', 'dim'] },
    children: { control: 'text' },
  },
  args: {
    variant: 'accent',
    children: 'CDI',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accent: Story = {
  args: { variant: 'accent', children: 'CDI' },
};

export const Cyan: Story = {
  args: { variant: 'cyan', children: 'Alternance' },
};

export const Dim: Story = {
  args: { variant: 'dim', children: 'Projet' },
};
