import { vi } from 'vitest';

vi.mock('@/contexts/LocaleContext', async () => {
  const { fr } = await import('@/lib/i18n/fr');
  return { useLocale: () => ({ locale: 'fr' as const, t: fr, setLocale: () => {} }) };
});

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ArchitectureSection } from './ArchitectureSection';

describe('ArchitectureSection', () => {
  it('rend sans erreur', () => {
    render(<ArchitectureSection />);
  });

  it('affiche un titre de section h2', () => {
    render(<ArchitectureSection />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('liste les couches atomiques', () => {
    render(<ArchitectureSection />);
    expect(screen.getAllByText(/Atoms|Atomes/i)[0]).toBeInTheDocument();
  });
});
