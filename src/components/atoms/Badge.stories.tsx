import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    children: 'Label',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accent: Story = {
  render: () => <Badge variant="accent">CDI</Badge>,
};

export const Cyan: Story = {
  render: () => <Badge variant="cyan">Alternance</Badge>,
};

export const Dim: Story = {
  render: () => <Badge variant="dim">Projet</Badge>,
};
