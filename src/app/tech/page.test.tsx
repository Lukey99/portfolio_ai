import { vi } from 'vitest';

// next/dynamic uses React.lazy under the hood; replicate that so async sections mount in tests
vi.mock('next/dynamic', async () => {
  const { default: React } = await import('react');
  return {
    default: (importFn: () => Promise<{ default: React.ComponentType }>, _opts?: unknown) => {
      const LazyComp = React.lazy(importFn);
      function Dynamic(props: Record<string, unknown>) {
        return React.createElement(React.Suspense, { fallback: null }, React.createElement(LazyComp, props));
      }
      return Dynamic;
    }
  };
});

vi.mock('@/components/sections', () => ({
  AIWorkflowSection:      () => <section data-testid="ai-workflow" />,
  TestsSection:           () => <section data-testid="tests" />,
  ApiSection:             () => <section data-testid="api" />,
  StorybookSection:       () => <section data-testid="storybook" />,
  TechPageIntro:          () => <h1>Tech</h1>,
}));

vi.mock('@/components/sections/TestsDashboardSection', () => ({
  TestsDashboardSection: () => <section data-testid="dashboard" />,
}));

vi.mock('@/components/sections/ArchitectureSection', () => ({
  ArchitectureSection: () => <section data-testid="architecture" />,
}));

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TechPage, { metadata } from './page';

describe('TechPage', () => {
  it('rend sans erreur', () => {
    render(<TechPage />);
  });

  it('affiche le titre "Tech"', () => {
    render(<TechPage />);
    expect(screen.getByRole('heading', { name: /^tech$/i })).toBeInTheDocument();
  });

  it('monte AIWorkflowSection', () => {
    render(<TechPage />);
    expect(screen.getByTestId('ai-workflow')).toBeInTheDocument();
  });

  it('monte TestsSection', () => {
    render(<TechPage />);
    expect(screen.getByTestId('tests')).toBeInTheDocument();
  });

  it('monte TestsDashboardSection', async () => {
    render(<TechPage />);
    expect(await screen.findByTestId('dashboard')).toBeInTheDocument();
  });

  it('monte ApiSection', () => {
    render(<TechPage />);
    expect(screen.getByTestId('api')).toBeInTheDocument();
  });

  it('monte ArchitectureSection', async () => {
    render(<TechPage />);
    expect(await screen.findByTestId('architecture')).toBeInTheDocument();
  });

  it('monte StorybookSection', () => {
    render(<TechPage />);
    expect(screen.getByTestId('storybook')).toBeInTheDocument();
  });

  it('a un titre contenant "Tech"', () => {
    expect((metadata as { title: string }).title).toContain('Tech');
  });

  it('a une description', () => {
    expect((metadata as { description: string }).description.length).toBeGreaterThan(0);
  });
});
