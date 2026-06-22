import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    children: 'Label',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => <Button href="#" variant="primary">Voir mon parcours →</Button>,
};

export const Secondary: Story = {
  render: () => <Button href="#" variant="secondary">Me contacter</Button>,
};

export const AsButton: Story = {
  render: () => <Button variant="primary" onClick={() => {}}>Action</Button>,
};

export const ExternalLink: Story = {
  render: () => <Button href="https://github.com" target="_blank" variant="secondary">GitHub ↗</Button>,
};
