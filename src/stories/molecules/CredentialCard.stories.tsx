import type { Meta, StoryObj } from '@storybook/react';
import { CredentialCard } from '@/components/molecules/CredentialCard';

const meta = {
  title: 'Molecules/CredentialCard',
  component: CredentialCard,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    index: { control: { type: 'number', min: 0, max: 5 } },
    period: { control: 'text' },
    institution: { control: 'text' },
    title: { control: 'text' },
    detail: { control: 'text' },
  },
  args: {
    index: 0,
    period: '2020 — 2023',
    institution: 'IUT de Bordeaux',
    title: 'BUT Informatique',
    detail: 'Développement logiciel & web',
  },
} satisfies Meta<typeof CredentialCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithDetail: Story = {};

export const WithoutDetail: Story = {
  args: {
    period: '2017 — 2020',
    institution: 'Lycée Louis-le-Grand',
    title: 'Baccalauréat Scientifique',
    detail: undefined,
  },
};
