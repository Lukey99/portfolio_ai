import type { Meta, StoryObj } from '@storybook/react';
import { CustomCursor } from '@/components/organisms/CustomCursor';

const meta = {
  title: 'Organisms/CustomCursor',
  component: CustomCursor,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CustomCursor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    Story => (
      <div
        style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg)' }}
        onMouseMove={e => {
          window.dispatchEvent(new MouseEvent('mousemove', {
            clientX: e.clientX,
            clientY: e.clientY,
            bubbles: true,
          }));
        }}
      >
        <p style={{ color: 'rgba(232,232,238,0.4)', fontSize: '0.85rem', pointerEvents: 'none' }}>
          Déplacez la souris ici
        </p>
        <Story />
      </div>
    ),
  ],
};
