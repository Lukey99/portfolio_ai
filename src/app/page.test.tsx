import { vi } from 'vitest';

vi.mock('@/contexts/LocaleContext', async () => {
  const { fr } = await import('@/lib/i18n/fr');
  return { useLocale: () => ({ locale: 'fr' as const, t: fr, setLocale: () => {} }) };
});

vi.mock('@/components/templates/MainLayout', () => ({
  MainLayout: ({ hero, sections }: { hero: React.ReactNode; sections: React.ReactNode[] }) => (
    <main data-testid="main-layout" data-sections={sections.length}>
      {hero}
    </main>
  ),
}));

vi.mock('@/components/sections', () => ({
  Hero: () => <div data-testid="hero" />,
  ProfileSection: () => null,
}));

vi.mock('@/components/organisms', () => ({
  Timeline: () => null,
  BentoGrid: () => null,
  CardList: () => null,
}));

vi.mock('@/components/molecules', () => ({
  TimelineCard: () => null,
  CredentialCard: () => null,
  ShowcaseCard: () => null,
  BentoCell: () => null,
}));

vi.mock('@/adapters/portfolio', () => ({
  toTimelineCardProps: (x: unknown) => x,
  toCredentialCardProps: (x: unknown) => x,
  toShowcaseCardProps: (x: unknown) => x,
  toBentoCellProps: (x: unknown) => x,
}));

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HomePage from './page';

describe('HomePage', () => {
  it('rend sans erreur', () => {
    render(<HomePage />);
  });

  it('monte le MainLayout', () => {
    render(<HomePage />);
    expect(screen.getByTestId('main-layout')).toBeInTheDocument();
  });

  it('passe 4 sections à MainLayout', () => {
    render(<HomePage />);
    expect(screen.getByTestId('main-layout').getAttribute('data-sections')).toBe('5');
  });

  it('passe le Hero en slot hero', () => {
    render(<HomePage />);
    expect(screen.getByTestId('hero')).toBeInTheDocument();
  });
});
