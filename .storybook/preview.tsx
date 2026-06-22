import type { Preview } from '@storybook/react';
import { useEffect, useRef } from 'react';
import '../src/app/globals.css';
import '../src/styles/animations.scss';

function StoryWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const timer = setTimeout(() => {
      el.querySelectorAll<HTMLElement>('.reveal, .timeline__fill').forEach(target => {
        target.classList.add('is-visible');
      });
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`html, * { cursor: auto !important; }`}</style>
      <div ref={ref} style={{ padding: '2rem', minHeight: '10rem', backgroundColor: 'var(--bg)' }}>
        {children}
      </div>
    </>
  );
}

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
    Story => (
      <StoryWrapper>
        <Story />
      </StoryWrapper>
    ),
  ],
};

export default preview;
