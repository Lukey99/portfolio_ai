import type React from 'react';
import dynamic from 'next/dynamic';
import { AIWorkflowSection, TestsSection, ApiSection, StorybookSection, TechPageIntro } from '@/components/sections';

const TestsDashboardSection = dynamic(
  () => import('@/components/sections/TestsDashboardSection').then(m => ({ default: m.TestsDashboardSection })),
  { loading: () => <div style={{ minHeight: '400px' }} /> },
);

const ArchitectureSection = dynamic(
  () => import('@/components/sections/ArchitectureSection').then(m => ({ default: m.ArchitectureSection })),
  { loading: () => <div style={{ minHeight: '200px' }} /> },
);

export const metadata = {
  title: 'Tech — Kévin Nguyen',
  description: 'Stack technique, workflow IA, tests automatisés, API REST, architecture atomique et Storybook.',
};

const Divider = () => (
  <div style={{ padding: '0 1.5rem' }}>
    <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(var(--overlay-rgb), 0.18), transparent)', maxWidth: '72rem', margin: '0 auto' }} />
  </div>
);

const TINT: React.CSSProperties = { backgroundColor: 'rgba(255,255,255,0.018)' };

export default function TechPage() {
  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>

      <TechPageIntro />

      <Divider />
      <div style={TINT}><AIWorkflowSection /></div>
      <Divider />
      <TestsSection />
      <Divider />
      <div style={TINT}><TestsDashboardSection /></div>
      <Divider />
      <ApiSection />
      <Divider />
      <div style={TINT}><ArchitectureSection /></div>
      <Divider />
      <StorybookSection />
    </div>
  );
}
