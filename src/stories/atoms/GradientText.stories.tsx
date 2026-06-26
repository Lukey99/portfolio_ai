import type { Meta, StoryObj } from '@storybook/react';
import { GradientText } from '@/components/atoms/GradientText';

const meta = {
  title: 'Atoms/GradientText',
  component: GradientText,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    children: { control: 'text' },
    className: { control: 'text' },
  },
  args: {
    children: 'Design System',
    className: '',
  },
} satisfies Meta<typeof GradientText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading: Story = {
  args: { children: 'Design System' },
  render: args => (
    <p style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
      <GradientText {...args} />
    </p>
  ),
};

export const Inline: Story = {
  args: { children: 'React & TypeScript' },
  render: args => (
    <p style={{ fontSize: '1rem', color: 'rgba(232,232,238,0.7)' }}>
      Spécialisé en <GradientText {...args} /> depuis 5 ans.
    </p>
  ),
};

export const Large: Story = {
  args: { children: 'Kévin Nguyen' },
  render: args => (
    <p style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-0.03em' }}>
      <GradientText {...args} />
    </p>
  ),
};
