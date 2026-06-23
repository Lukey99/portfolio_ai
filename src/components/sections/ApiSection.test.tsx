import { vi } from 'vitest';

vi.mock('@/contexts/LocaleContext', async () => {
  const { fr } = await import('@/lib/i18n/fr');
  return { useLocale: () => ({ locale: 'fr' as const, t: fr, setLocale: () => {} }) };
});

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ApiSection } from './ApiSection';

describe('ApiSection', () => {
  it('rend sans erreur', () => {
    render(<ApiSection />);
  });

  it('affiche un titre de section h2', () => {
    render(<ApiSection />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('contient un élément section', () => {
    const { container } = render(<ApiSection />);
    expect(container.querySelector('section')).toBeTruthy();
  });
});
