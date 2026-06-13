'use client';

import type { Portfolio } from '@/types/portfolio.types';
import {
  Header,
  Hero,
  ExperienceSection,
  SkillsSection,
  AIWorkflowSection,
  ProjectsSection,
  EducationSection,
  ContactSection,
  CustomCursor,
} from '@/components/organisms';

interface MainLayoutProps {
  data: Portfolio;
}

export function MainLayout({ data }: MainLayoutProps) {
  const { personalInfo, experiences, skills, projects, education } = data;

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      <CustomCursor />
      <Header />
      <main>
        <Hero info={personalInfo} />
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(var(--overlay-rgb), 0.06), transparent)', maxWidth: '900px', margin: '0 auto' }} />
        <ExperienceSection experiences={experiences} />
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(var(--overlay-rgb), 0.06), transparent)', maxWidth: '900px', margin: '0 auto' }} />
        <SkillsSection skills={skills} />
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(var(--overlay-rgb), 0.06), transparent)', maxWidth: '900px', margin: '0 auto' }} />
        <AIWorkflowSection />
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(var(--overlay-rgb), 0.06), transparent)', maxWidth: '900px', margin: '0 auto' }} />
        <ProjectsSection projects={projects} />
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(var(--overlay-rgb), 0.06), transparent)', maxWidth: '900px', margin: '0 auto' }} />
        <EducationSection education={education} />
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(var(--overlay-rgb), 0.06), transparent)', maxWidth: '900px', margin: '0 auto' }} />
        <ContactSection info={personalInfo} />
      </main>
    </div>
  );
}
