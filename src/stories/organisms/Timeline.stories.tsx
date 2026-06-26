import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { Timeline } from '@/components/organisms/Timeline';
import { TimelineCard, CredentialCard } from '@/components/molecules';
import { toTimelineCardProps, toCredentialCardProps } from '@/adapters/portfolio';
import { portfolioData } from '@/lib/mock-data';

const meta = {
  title: 'Organisms/Timeline',
  component: Timeline,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
  },
  argTypes: {
    title: { control: 'object' },
    items: { control: 'object' },
    maxWidth: { control: 'text' },
  },
  args: {
    title: {
      number: '01',
      label: 'Expériences',
      title: 'Mon Parcours',
      subtitle:
        "Des expériences variées qui m'ont permis de développer une expertise complète en développement front-end.",
    },
    items: portfolioData.experiences,
    renderItem: ((exp: (typeof portfolioData.experiences)[0], i: number) => (
      <TimelineCard {...toTimelineCardProps(exp)} index={i} />
    )) as unknown as (item: { id: string }, index: number) => ReactNode,
  },
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Experiences: Story = {};

export const Education: Story = {
  args: {
    title: {
      number: '04',
      label: 'Formation',
      title: 'Mon Cursus',
      subtitle: 'Un parcours académique solide qui allie théorie et pratique.',
    },
    items: portfolioData.education as unknown as typeof portfolioData.experiences,
    renderItem: ((edu: (typeof portfolioData.education)[0], i: number) => (
      <CredentialCard {...toCredentialCardProps(edu)} index={i} />
    )) as unknown as (item: { id: string }, index: number) => ReactNode,
  },
};
