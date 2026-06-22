import type { Meta, StoryObj } from '@storybook/react';
import { ExperienceCard } from './ExperienceCard';

const meta = {
  title: 'Molecules/ExperienceCard',
  component: ExperienceCard,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    index: 0,
    experience: {
      id: 'default',
      company: 'Acme Corp',
      title: 'Développeur Front-End',
      period: '2024',
      type: 'full-time' as const,
      description: [],
    },
  },
} satisfies Meta<typeof ExperienceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullTime: Story = {
  render: () => (
    <ExperienceCard
      index={0}
      experience={{
        id: 'exp-1',
        company: 'Acme Corp',
        title: 'Développeur Front-End Senior',
        period: 'Jan. 2023 — aujourd\'hui',
        type: 'full-time',
        description: [
          'Mise en place d\'un design system React partagé entre 4 équipes.',
          'Refonte de l\'interface admin (réduction de 40% du temps de chargement).',
        ],
      }}
    />
  ),
};

export const Apprenticeship: Story = {
  render: () => (
    <ExperienceCard
      index={1}
      experience={{
        id: 'exp-2',
        company: 'Startup XYZ',
        title: 'Développeur Vue.js',
        period: 'Sep. 2021 — Jun. 2023',
        type: 'apprenticeship',
        description: [
          'Développement de composants Vue 3 avec Composition API.',
          'Intégration d\'une API REST et gestion d\'état avec Pinia.',
        ],
      }}
    />
  ),
};

export const Project: Story = {
  render: () => (
    <ExperienceCard
      index={2}
      experience={{
        id: 'exp-3',
        company: 'Portfolio AI',
        title: 'Projet personnel',
        period: '2024',
        type: 'entrepreneur',
        description: [
          'Portfolio Next.js 16 avec design system en Atomic Design.',
          'Intégration IA (Cursor + Claude Code) dans le workflow.',
        ],
      }}
    />
  ),
};
