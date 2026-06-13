import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useTheme } from './useTheme';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('light');
});

describe('useTheme', () => {
  it('démarre en mode sombre par défaut', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');
  });

  it('détecte le mode clair depuis la classe html existante (anti-flash)', () => {
    document.documentElement.classList.add('light');
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');
  });

  it('toggle passe en mode clair, ajoute la classe et persiste en localStorage', () => {
    const { result } = renderHook(() => useTheme());

    act(() => { result.current.toggle(); });

    expect(result.current.theme).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('toggle retour en mode sombre supprime la classe et met à jour localStorage', () => {
    document.documentElement.classList.add('light');
    const { result } = renderHook(() => useTheme());

    act(() => { result.current.toggle(); });

    expect(result.current.theme).toBe('dark');
    expect(document.documentElement.classList.contains('light')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('deux toggles consécutifs reviennent à l\'état initial', () => {
    const { result } = renderHook(() => useTheme());

    act(() => { result.current.toggle(); });
    act(() => { result.current.toggle(); });

    expect(result.current.theme).toBe('dark');
    expect(document.documentElement.classList.contains('light')).toBe(false);
  });
});
