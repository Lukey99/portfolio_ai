import type { Meta, StoryObj } from '@storybook/react';
import { SectionTitle } from './SectionTitle';

const meta = {
  title: 'Molecules/SectionTitle',
  component: SectionTitle,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    number: '01',
    label: 'Section',
    title: 'Titre de section',
  },
} satisfies Meta<typeof SectionTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithSubtitle: Story = {
  render: () => (
    <SectionTitle
      number="01"
      label="Expériences"
      title="Mon parcours professionnel"
      subtitle="Développeur front-end depuis 5 ans, spécialisé React et Vue."
    />
  ),
};

export const WithoutSubtitle: Story = {
  render: () => (
    <SectionTitle
      number="02"
      label="Compétences"
      title="Stack technique"
    />
  ),
};
