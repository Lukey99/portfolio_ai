import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    return mergeConfig(config, {
      plugins: [tsconfigPaths()],
      define: {
        'process.env': {},
      },
      resolve: {
        alias: {
          'next/link': path.resolve(__dirname, './__mocks__/next-link.tsx'),
          'next/navigation': path.resolve(__dirname, './__mocks__/next-navigation.ts'),
        },
      },
    });
  },
};

export default config;
