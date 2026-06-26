import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import axe from 'axe-core';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Tag } from '@/components/atoms/Tag';
import { GradientText } from '@/components/atoms/GradientText';
import { SectionTitle } from '@/components/molecules/SectionTitle';
import { TimelineCard } from '@/components/molecules/TimelineCard';
import { CredentialCard } from '@/components/molecules/CredentialCard';
import { BentoCell } from '@/components/molecules/BentoCell';

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

describe('Accessibilité — Molecules', () => {
  it('SectionTitle : aucune violation axe', async () => {
    expect(
      await a11y(<SectionTitle number="01" label="Expériences" title="Mon parcours" />)
    ).toHaveLength(0);
  });

  it('TimelineCard : aucune violation axe', async () => {
    expect(
      await a11y(
        <TimelineCard
          badge="CDI"
          period="2022 — 2024"
          title="Acme"
          subtitle="Dev Front"
          items={['Tâche A']}
          index={0}
        />
      )
    ).toHaveLength(0);
  });

  it('CredentialCard : aucune violation axe', async () => {
    expect(
      await a11y(
        <CredentialCard period="2019 — 2022" institution="ESIEA" title="Ingénieur" index={0} />
      )
    ).toHaveLength(0);
  });

  it('BentoCell : aucune violation axe', async () => {
    expect(
      await a11y(<BentoCell icon="⚡" name="Stack" skills={['React', 'TypeScript']} index={0} />)
    ).toHaveLength(0);
  });
});
