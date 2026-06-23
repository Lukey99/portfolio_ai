import { vi } from 'vitest';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));
vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: unknown }) => ({ href, children }),
}));

import { describe, it, expect } from 'vitest';
import {
  Hero,
  ContactSection,
  ApiSection,
  AIWorkflowSection,
  TestsSection,
  TestsDashboardSection,
  ArchitectureSection,
  StorybookSection,
  TechPageIntro,
} from './index';

describe('sections/index barrel', () => {
  it('re-exporte Hero',                  () => { expect(Hero).toBeDefined(); });
  it('re-exporte ContactSection',        () => { expect(ContactSection).toBeDefined(); });
  it('re-exporte ApiSection',            () => { expect(ApiSection).toBeDefined(); });
  it('re-exporte AIWorkflowSection',     () => { expect(AIWorkflowSection).toBeDefined(); });
  it('re-exporte TestsSection',          () => { expect(TestsSection).toBeDefined(); });
  it('re-exporte TestsDashboardSection', () => { expect(TestsDashboardSection).toBeDefined(); });
  it('re-exporte ArchitectureSection',   () => { expect(ArchitectureSection).toBeDefined(); });
  it('re-exporte StorybookSection',      () => { expect(StorybookSection).toBeDefined(); });
  it('re-exporte TechPageIntro',         () => { expect(TechPageIntro).toBeDefined(); });
});
