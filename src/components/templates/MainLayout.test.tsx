import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MainLayout } from './MainLayout';

describe('MainLayout', () => {
  it('rend sans erreur', () => {
    render(<MainLayout hero={<div />} sections={[]} />);
  });

  it('affiche le slot hero', () => {
    render(<MainLayout hero={<div data-testid="hero" />} sections={[]} />);
    expect(screen.getByTestId('hero')).toBeInTheDocument();
  });

  it('affiche les sections avec un Divider entre chaque', () => {
    const { container } = render(
      <MainLayout
        hero={<div />}
        sections={[
          <div key="a" data-testid="s1" />,
          <div key="b" data-testid="s2" />,
          <div key="c" data-testid="s3" />,
        ]}
      />
    );
    expect(screen.getByTestId('s1')).toBeInTheDocument();
    expect(screen.getByTestId('s2')).toBeInTheDocument();
    expect(screen.getByTestId('s3')).toBeInTheDocument();
    // 3 sections → 3 dividers
    expect(container.querySelectorAll('div[style*="1px"]').length).toBe(3);
  });

  it('fonctionne sans sections', () => {
    render(<MainLayout hero={<div data-testid="hero" />} sections={[]} />);
    expect(screen.getByTestId('hero')).toBeInTheDocument();
  });
});
