import { vi } from 'vitest';

vi.mock('@/contexts/LocaleContext', async () => {
  const { fr } = await import('@/lib/i18n/fr');
  return { useLocale: () => ({ locale: 'fr' as const, t: fr, setLocale: () => {} }) };
});

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...(props as Record<string, unknown>)}>
      {children}
    </a>
  ),
}));

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Header } from './Header';

describe('Header', () => {
  it('rend sans erreur', () => {
    render(<Header />);
  });

  it('affiche le logo avec lien vers "/"', () => {
    render(<Header />);
    const logoLink = document.querySelector('a[href="/"]');
    expect(logoLink).toBeTruthy();
    expect(logoLink?.textContent).toMatch(/KN/);
  });

  it('affiche les liens de navigation desktop', () => {
    render(<Header />);
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Tech')).toBeInTheDocument();
    expect(screen.getAllByText('Contact')[0]).toBeInTheDocument();
  });

  it('affiche le bouton toggle de thème', () => {
    render(<Header />);
    const btn = screen.getByRole('button', { name: /mode/i });
    expect(btn).toBeInTheDocument();
  });

  it('affiche le bouton hamburger sur mobile', () => {
    render(<Header />);
    expect(screen.getByRole('button', { name: /ouvrir le menu/i })).toBeInTheDocument();
  });

  it('ouvre le menu mobile au clic du hamburger', async () => {
    render(<Header />);
    const hamburger = screen.getByRole('button', { name: /ouvrir le menu/i });
    fireEvent.click(hamburger);
    expect(screen.getByRole('button', { name: /fermer le menu/i })).toBeInTheDocument();
  });

  it('ferme le menu mobile au second clic', () => {
    render(<Header />);
    const hamburger = screen.getByRole('button', { name: /ouvrir le menu/i });
    fireEvent.click(hamburger);
    fireEvent.click(screen.getByRole('button', { name: /fermer le menu/i }));
    expect(screen.getByRole('button', { name: /ouvrir le menu/i })).toBeInTheDocument();
  });
});
