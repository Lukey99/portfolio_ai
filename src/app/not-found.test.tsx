import { vi } from 'vitest';

vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NotFound from './not-found';

describe('NotFound', () => {
  it('rend sans erreur', () => {
    render(<NotFound />);
  });

  it('affiche le titre "Page introuvable"', () => {
    render(<NotFound />);
    expect(screen.getByRole('heading', { name: /page introuvable/i })).toBeInTheDocument();
  });

  it('affiche le label "Erreur 404"', () => {
    render(<NotFound />);
    expect(screen.getByText(/erreur 404/i)).toBeInTheDocument();
  });

  it("affiche un lien vers l'accueil", () => {
    render(<NotFound />);
    const link = screen.getByRole('link', { name: /retour à l'accueil/i });
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/');
  });
});
