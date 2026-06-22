import type { Preview } from '@storybook/react';
import '../src/app/globals.css';
import '../src/styles/animations.scss';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#060609' },
        { name: 'light', value: '#f2f0ff' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', minHeight: '10rem', backgroundColor: 'var(--bg)' }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
