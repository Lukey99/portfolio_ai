import { vi } from 'vitest';

vi.mock('@/components/sections', () => ({
  AIWorkflowSection:      () => <section data-testid="ai-workflow" />,
  TestsSection:           () => <section data-testid="tests" />,
  TestsDashboardSection:  () => <section data-testid="dashboard" />,
  ApiSection:             () => <section data-testid="api" />,
  ArchitectureSection:    () => <section data-testid="architecture" />,
  StorybookSection:       () => <section data-testid="storybook" />,
  TechPageIntro:          () => <h1>Tech</h1>,
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

  it('monte TestsDashboardSection', () => {
    render(<TechPage />);
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });

  it('monte ApiSection', () => {
    render(<TechPage />);
    expect(screen.getByTestId('api')).toBeInTheDocument();
  });

  it('monte ArchitectureSection', () => {
    render(<TechPage />);
    expect(screen.getByTestId('architecture')).toBeInTheDocument();
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
