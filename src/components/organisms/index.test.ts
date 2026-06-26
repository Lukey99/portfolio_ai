import { vi } from 'vitest';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));
vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: unknown }) => ({ href, children }),
}));

import { describe, it, expect } from 'vitest';
import { Header, CustomCursor, Timeline, BentoGrid, CardList } from './index';

describe('organisms/index barrel', () => {
  it('re-exporte Header', () => {
    expect(Header).toBeDefined();
  });
  it('re-exporte CustomCursor', () => {
    expect(CustomCursor).toBeDefined();
  });
  it('re-exporte Timeline', () => {
    expect(Timeline).toBeDefined();
  });
  it('re-exporte BentoGrid', () => {
    expect(BentoGrid).toBeDefined();
  });
  it('re-exporte CardList', () => {
    expect(CardList).toBeDefined();
  });
});
