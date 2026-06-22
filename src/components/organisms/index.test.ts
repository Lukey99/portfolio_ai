import { vi } from 'vitest';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));
vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: unknown }) => ({ href, children }),
}));

import { describe, it, expect } from 'vitest';
import {
  Header,
  ApiSection,
  Hero,
  AIWorkflowSection,
  TestsSection,
  TestsDashboardSection,
  ArchitectureSection,
  StorybookSection,
  ExperienceSection,
  SkillsSection,
  ProjectsSection,
  EducationSection,
  ContactSection,
  CustomCursor,
} from './index';

describe('organisms/index barrel', () => {
  it('re-exporte Header',               () => { expect(Header).toBeDefined(); });
  it('re-exporte ApiSection',           () => { expect(ApiSection).toBeDefined(); });
  it('re-exporte Hero',                 () => { expect(Hero).toBeDefined(); });
  it('re-exporte AIWorkflowSection',    () => { expect(AIWorkflowSection).toBeDefined(); });
  it('re-exporte TestsSection',         () => { expect(TestsSection).toBeDefined(); });
  it('re-exporte TestsDashboardSection',() => { expect(TestsDashboardSection).toBeDefined(); });
  it('re-exporte ArchitectureSection',  () => { expect(ArchitectureSection).toBeDefined(); });
  it('re-exporte StorybookSection',     () => { expect(StorybookSection).toBeDefined(); });
  it('re-exporte ExperienceSection',    () => { expect(ExperienceSection).toBeDefined(); });
  it('re-exporte SkillsSection',        () => { expect(SkillsSection).toBeDefined(); });
  it('re-exporte ProjectsSection',      () => { expect(ProjectsSection).toBeDefined(); });
  it('re-exporte EducationSection',     () => { expect(EducationSection).toBeDefined(); });
  it('re-exporte ContactSection',       () => { expect(ContactSection).toBeDefined(); });
  it('re-exporte CustomCursor',         () => { expect(CustomCursor).toBeDefined(); });
});
