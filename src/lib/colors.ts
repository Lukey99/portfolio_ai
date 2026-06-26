/** Shared brand color hex values — single source of truth for JS/TS color usage. */
export const VIOLET = '#8b5cf6';
export const CYAN   = '#22d3ee';
export const V_MID  = '#a78bfa';
export const V_LITE = '#c4b5fd';
export const GREEN  = '#10b981';
export const AMBER  = '#f59e0b';
export const SLATE  = '#94a3b8';

/** Returns a CSS rgba() string from a hex color and an opacity (0–1). */
export function va(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
