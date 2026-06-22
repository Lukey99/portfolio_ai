import { vi } from 'vitest';

vi.mock('next/og', () => ({
  ImageResponse: class ImageResponse {
    element: unknown;
    options: unknown;
    constructor(element: unknown, options: unknown) {
      this.element = element;
      this.options = options;
    }
  },
}));

import { describe, it, expect } from 'vitest';
import AppleIcon, { size, contentType } from './apple-icon';

describe('AppleIcon (180×180)', () => {
  it('exporte size { width: 180, height: 180 }', () => {
    expect(size).toEqual({ width: 180, height: 180 });
  });

  it('exporte contentType "image/png"', () => {
    expect(contentType).toBe('image/png');
  });

  it('retourne une ImageResponse', () => {
    const response = AppleIcon();
    expect(response).toBeDefined();
  });
});
