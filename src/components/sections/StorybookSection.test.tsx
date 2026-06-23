import { vi } from 'vitest';

vi.mock('@/contexts/LocaleContext', async () => {
  const { fr } = await import('@/lib/i18n/fr');
  return { useLocale: () => ({ locale: 'fr' as const, t: fr, setLocale: () => {} }) };
});

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StorybookSection } from './StorybookSection';

describe('StorybookSection', () => {
  it('rend sans erreur', () => {
    render(<StorybookSection />);
  });

  it('affiche un titre de section h2', () => {
    render(<StorybookSection />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('affiche les composants showcasés', () => {
    render(<StorybookSection />);
    expect(screen.getByText('Button')).toBeInTheDocument();
  });
});
