import type { Meta, StoryObj } from '@storybook/react';
import { CardList } from '@/components/organisms/CardList';
import { ShowcaseCard } from '@/components/molecules';
import { toShowcaseCardProps } from '@/adapters/portfolio';
import { portfolioData } from '@/lib/mock-data';

const meta = {
  title: 'Organisms/CardList',
  component: CardList,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
  },
  argTypes: {
    title: { control: 'object' },
    items: { control: 'object' },
    maxWidth: { control: 'text' },
    gap: { control: 'text' },
  },
  args: {
    title: {
      number: '03',
      label: 'Projets',
      title: 'Projets Entrepreneuriaux',
      subtitle: "Des initiatives personnelles qui reflètent ma passion pour le produit et l'expérience utilisateur.",
    },
    items: portfolioData.projects,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderItem: ((proj: typeof portfolioData.projects[0], i: number) => (
      <ShowcaseCard {...toShowcaseCardProps(proj)} index={i} />
    )) as any,
  },
} satisfies Meta<typeof CardList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Projects: Story = {};
