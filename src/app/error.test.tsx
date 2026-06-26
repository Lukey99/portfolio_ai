import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorPage from './error';

const mockError = Object.assign(new globalThis.Error('Test error'), { digest: undefined });
const mockReset = vi.fn();

describe('Error', () => {
  it('rend sans erreur', () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
  });

  it("affiche le titre d'erreur", () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    expect(
      screen.getByRole('heading', { name: /quelque chose s'est mal passé/i })
    ).toBeInTheDocument();
  });

  it('affiche le label "Erreur inattendue"', () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    expect(screen.getByText('Erreur inattendue', { selector: 'p' })).toBeInTheDocument();
  });

  it('affiche le bouton Réessayer', () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    expect(screen.getByRole('button', { name: /réessayer/i })).toBeInTheDocument();
  });

  it('appelle reset au clic sur Réessayer', () => {
    const reset = vi.fn();
    render(<ErrorPage error={mockError} reset={reset} />);
    fireEvent.click(screen.getByRole('button', { name: /réessayer/i }));
    expect(reset).toHaveBeenCalledOnce();
  });

  it("affiche un lien vers l'accueil", () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    const link = screen.getByRole('link', { name: /accueil/i });
    expect(link.getAttribute('href')).toBe('/');
  });

  it("log l'erreur en console uniquement en mode développement", () => {
    vi.stubEnv('NODE_ENV', 'development');
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<ErrorPage error={mockError} reset={mockReset} />);
    expect(spy).toHaveBeenCalledWith(mockError);
    spy.mockRestore();
    vi.unstubAllEnvs();
  });

  it("ne log pas l'erreur en console hors mode développement", () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<ErrorPage error={mockError} reset={mockReset} />);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
