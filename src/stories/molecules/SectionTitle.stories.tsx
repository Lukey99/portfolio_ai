import type { Meta, StoryObj } from '@storybook/react';
import { SectionTitle } from '@/components/molecules/SectionTitle';

const meta = {
  title: 'Molecules/SectionTitle',
  component: SectionTitle,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    number: { control: 'text' },
    label: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
  args: {
    number: '01',
    label: 'Expériences',
    title: 'Mon parcours professionnel',
    subtitle: 'Développeur front-end depuis 5 ans, spécialisé React et Vue.',
  },
} satisfies Meta<typeof SectionTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithSubtitle: Story = {
  args: {
    number: '01',
    label: 'Expériences',
    title: 'Mon parcours professionnel',
    subtitle: 'Développeur front-end depuis 5 ans, spécialisé React et Vue.',
  },
};

export const WithoutSubtitle: Story = {
  args: {
    number: '02',
    label: 'Compétences',
    title: 'Stack technique',
    subtitle: undefined,
  },
};
