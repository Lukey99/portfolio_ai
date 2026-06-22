import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import axe from 'axe-core';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Tag } from '@/components/atoms/Tag';
import { GradientText } from '@/components/atoms/GradientText';
import { SectionTitle } from '@/components/molecules/SectionTitle';
import { ExperienceCard } from '@/components/molecules/ExperienceCard';
import { EducationCard } from '@/components/molecules/EducationCard';
import { SkillBento } from '@/components/molecules/SkillBento';
import type { Experience, Education, SkillCategory } from '@/types/portfolio.types';

async function a11y(ui: React.ReactElement) {
  const { container } = render(ui);
  const results = await axe.run(container);
  return results.violations;
}

// ── Atoms ─────────────────────────────────────────────────────

describe('Accessibilité — Atoms', () => {
  it('Badge : aucune violation axe', async () => {
    expect(await a11y(<Badge>CDI</Badge>)).toHaveLength(0);
  });

  it('Button <a> : aucune violation axe', async () => {
    expect(await a11y(<Button href="/contact">Contact</Button>)).toHaveLength(0);
  });

  it('Button <button> : aucune violation axe', async () => {
    expect(await a11y(<Button onClick={() => {}}>Action</Button>)).toHaveLength(0);
  });

  it('Tag : aucune violation axe', async () => {
    expect(await a11y(<Tag>React</Tag>)).toHaveLength(0);
  });

  it('GradientText : aucune violation axe', async () => {
    expect(await a11y(<GradientText>Hello</GradientText>)).toHaveLength(0);
  });
});

// ── Molecules ─────────────────────────────────────────────────

const exp: Experience = {
  id: '1', company: 'Acme', title: 'Dev Front', period: '2022 — 2024',
  type: 'full-time', description: ['Développement React'],
};

const edu: Education = {
  id: '1', degree: 'Ingénieur', school: 'ESIEA', period: '2019 — 2022',
};

const skill: SkillCategory = {
  id: 'stack', name: 'Stack', icon: '⚡', skills: ['React', 'TypeScript'],
};

describe('Accessibilité — Molecules', () => {
  it('SectionTitle : aucune violation axe', async () => {
    expect(await a11y(
      <SectionTitle number="01" label="Expériences" title="Mon parcours" />
    )).toHaveLength(0);
  });

  it('ExperienceCard : aucune violation axe', async () => {
    expect(await a11y(<ExperienceCard experience={exp} index={0} />)).toHaveLength(0);
  });

  it('EducationCard : aucune violation axe', async () => {
    expect(await a11y(<EducationCard education={edu} index={0} />)).toHaveLength(0);
  });

  it('SkillBento : aucune violation axe', async () => {
    expect(await a11y(<SkillBento category={skill} index={0} />)).toHaveLength(0);
  });
});
