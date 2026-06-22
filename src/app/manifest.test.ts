import { describe, it, expect } from 'vitest';
import manifest from './manifest';

describe('manifest', () => {
  it('retourne un objet', () => {
    expect(typeof manifest()).toBe('object');
  });

  it('name correct', () => {
    expect(manifest().name).toContain('Kévin Nguyen');
  });

  it('short_name "KN"', () => {
    expect(manifest().short_name).toBe('KN');
  });

  it('start_url "/"', () => {
    expect(manifest().start_url).toBe('/');
  });

  it('display "standalone"', () => {
    expect(manifest().display).toBe('standalone');
  });

  it('theme_color violet', () => {
    expect(manifest().theme_color).toBe('#8b5cf6');
  });

  it('background_color sombre', () => {
    expect(manifest().background_color).toBe('#060609');
  });

  it('icons définis', () => {
    expect(Array.isArray(manifest().icons)).toBe(true);
    expect((manifest().icons as unknown[]).length).toBeGreaterThan(0);
  });
});
