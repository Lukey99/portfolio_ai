import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { BentoGrid } from '@/components/organisms/BentoGrid';
import { BentoCell } from '@/components/molecules';
import { toBentoCellProps } from '@/adapters/portfolio';
import { portfolioData } from '@/lib/mock-data';

const meta = {
  title: 'Organisms/BentoGrid',
  component: BentoGrid,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
    viewport: {
      viewports: {
        wide: { name: 'Desktop Wide', styles: { width: '1280px', height: '900px' } },
      },
      defaultViewport: 'wide',
    },
  },
  argTypes: {
    title: { control: 'object' },
    items: { control: 'object' },
    maxWidth: { control: 'text' },
  },
  args: {
    title: {
      number: '02',
      label: 'Compétences',
      title: 'Ma Stack',
      subtitle: "Les technologies et outils que j'utilise au quotidien pour créer des interfaces de qualité.",
    },
    items: [
      { data: portfolioData.skills[0], colSpan: 2 },
      { data: portfolioData.skills[1], rowSpan: 2 },
      { data: portfolioData.skills[2] },
      { data: portfolioData.skills[3] },
    ],
    renderItem: ((skill: typeof portfolioData.skills[0], i: number) => (
      <BentoCell {...toBentoCellProps(skill)} index={i} />
    )) as unknown as (item: { id: string }, index: number) => ReactNode,
  },
} satisfies Meta<typeof BentoGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Skills: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '812px' } },
      },
      defaultViewport: 'mobile',
    },
  },
};
