import type { Meta, StoryObj } from '@storybook/react';
import { BentoCell } from '@/components/molecules/BentoCell';

const meta = {
  title: 'Molecules/BentoCell',
  component: BentoCell,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    index: { control: { type: 'number', min: 0, max: 5 } },
    icon: { control: 'text' },
    name: { control: 'text' },
    skills: { control: 'object' },
  },
  args: {
    index: 0,
    icon: '⚛️',
    name: 'Front-End',
    skills: ['React', 'Vue', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  },
} satisfies Meta<typeof BentoCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Frontend: Story = {};

export const Tooling: Story = {
  args: {
    icon: '🛠️',
    name: 'Outils & CI/CD',
    skills: ['Vite', 'Vitest', 'Storybook', 'ESLint', 'Prettier', 'GitHub Actions'],
  },
};

export const Backend: Story = {
  args: {
    icon: '🗄️',
    name: 'Back-End',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'REST API'],
  },
};
