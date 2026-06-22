import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from '@/components/atoms/Tag';

const meta = {
  title: 'Atoms/Tag',
  component: Tag,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    children: { control: 'text' },
  },
  args: {
    children: 'React',
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'React' },
};

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Tag>React</Tag>
      <Tag>TypeScript</Tag>
      <Tag>Next.js</Tag>
      <Tag>Framer Motion</Tag>
      <Tag>Vitest</Tag>
    </div>
  ),
};
