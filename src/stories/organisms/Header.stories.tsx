import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { Header } from '@/components/organisms/Header';

const preventNav = (Story: React.ComponentType) => (
  <div onClickCapture={e => {
    const target = e.target as HTMLElement;
    if (target.closest('a')) e.preventDefault();
  }}>
    <Story />
  </div>
);

const meta = {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
  },
  decorators: [preventNav],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Scrolled: Story = {
  play: async () => {
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    window.dispatchEvent(new Event('scroll'));
  },
};

export const MobileMenu: Story = {
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '812px' } },
      },
      defaultViewport: 'mobile',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const hamburger = await canvas.findByLabelText('Ouvrir le menu');
    await userEvent.click(hamburger);
  },
};
