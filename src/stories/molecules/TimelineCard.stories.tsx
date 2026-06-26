import type { Meta, StoryObj } from '@storybook/react';
import { TimelineCard } from '@/components/molecules/TimelineCard';

const meta = {
  title: 'Molecules/TimelineCard',
  component: TimelineCard,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    index: { control: { type: 'number', min: 0, max: 5 } },
    badge: { control: 'text' },
    period: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    items: { control: 'object' },
  },
  args: {
    index: 0,
    badge: 'CDI',
    period: "Jan. 2023 — Aujourd'hui",
    title: 'Acme Corp',
    subtitle: 'Développeur Front-End Senior',
    items: [
      'Design system React partagé entre 4 équipes product.',
      "Refonte de l'interface admin (−40 % temps de chargement).",
    ],
  },
} satisfies Meta<typeof TimelineCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullTime: Story = {};

export const Apprenticeship: Story = {
  args: {
    badge: 'Alternance',
    period: 'Sept. 2021 — Août 2023',
    title: 'StartupXYZ',
    subtitle: 'Développeur Vue.js',
    items: [
      'Migration Angular → Vue 3 + Composition API.',
      "Intégration d'une API REST et gestion d'état avec Pinia.",
    ],
  },
};

export const Entrepreneur: Story = {
  args: {
    badge: 'Projet',
    period: '2024',
    title: 'Portfolio AI',
    subtitle: 'Projet personnel',
    items: [
      'Portfolio Next.js 16 avec design system en Atomic Design.',
      'Intégration IA (Cursor + Claude Code) dans le workflow.',
    ],
  },
};
