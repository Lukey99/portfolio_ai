import type { Meta, StoryObj } from '@storybook/react';
import { ShowcaseCard } from '@/components/molecules/ShowcaseCard';

const meta = {
  title: 'Molecules/ShowcaseCard',
  component: ShowcaseCard,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    index: { control: { type: 'number', min: 0, max: 5 } },
    period: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    description: { control: 'object' },
    tags: { control: 'object' },
  },
  args: {
    index: 0,
    period: '2024',
    title: 'Portfolio AI',
    subtitle: 'Portefeuille généré avec IA',
    description: [
      'Next.js 16 + React 19, animations Framer Motion v12.',
      'Pipeline CI/CD : 252 tests Vitest, couverture 100 %.',
      'Design system Atomic Design avec Storybook intégré.',
    ],
    tags: ['Next.js', 'React', 'TypeScript', 'Framer Motion', 'Vitest', 'Storybook'],
  },
} satisfies Meta<typeof ShowcaseCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SideProject: Story = {
  args: {
    period: '2023',
    title: 'Open Source',
    subtitle: 'Composant calendrier Vue 3',
    description: [
      'Composant headless compatible Vue 3 + Nuxt 3.',
      '0 dépendance, entièrement testé avec Vitest + Vue Test Utils.',
    ],
    tags: ['Vue 3', 'TypeScript', 'Vitest', 'npm'],
  },
};
