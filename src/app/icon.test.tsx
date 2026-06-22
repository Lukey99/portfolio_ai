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
import Icon, { size, contentType } from './icon';

describe('Icon (favicon 32×32)', () => {
  it('exporte size { width: 32, height: 32 }', () => {
    expect(size).toEqual({ width: 32, height: 32 });
  });

  it('exporte contentType "image/png"', () => {
    expect(contentType).toBe('image/png');
  });

  it('retourne une ImageResponse', () => {
    const response = Icon();
    expect(response).toBeDefined();
  });
});
