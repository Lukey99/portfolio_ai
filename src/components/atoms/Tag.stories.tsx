import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta = {
  title: 'Atoms/Tag',
  component: Tag,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    children: 'Tag',
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Tag>React</Tag>,
};

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Tag>React</Tag>
      <Tag>TypeScript</Tag>
      <Tag>Next.js</Tag>
      <Tag>Motion</Tag>
    </div>
  ),
};
