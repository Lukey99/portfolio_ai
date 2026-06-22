import type React from 'react';
import { AIWorkflowSection, TestsSection, TestsDashboardSection, ApiSection, ArchitectureSection, StorybookSection } from '@/components/sections';

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

      {/* Page intro */}
      <div style={{ padding: '9rem 1.5rem 3rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <p style={{ fontSize: '0.7rem', color: 'rgba(var(--fg-rgb), 0.35)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Stack & Méthodologie
        </p>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, color: 'var(--fg)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          Tech
        </h1>
        <p style={{ fontSize: '1rem', color: 'rgba(var(--fg-rgb), 0.45)', marginTop: '1rem', maxWidth: '480px', margin: '1rem auto 0' }}>
          IA & Workflow · Tests · Architecture · Storybook
        </p>
      </div>

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
