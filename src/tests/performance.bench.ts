import { bench, describe } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import React from 'react';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Tag } from '@/components/atoms/Tag';
import { GradientText } from '@/components/atoms/GradientText';
import { SectionTitle } from '@/components/molecules/SectionTitle';
import { ExperienceCard } from '@/components/molecules/ExperienceCard';
import type { Experience } from '@/types/portfolio.types';

const exp: Experience = {
  id: '1', company: 'Acme', title: 'Dev Front', period: '2022',
  type: 'full-time', description: ['Task A'],
};

// ── Atoms ─────────────────────────────────────────────────────

describe('Benchmark — Atoms', () => {
  bench('Badge render', () => {
    render(React.createElement(Badge, null, 'CDI'));
    cleanup();
  }, { iterations: 50 });

  bench('Button render', () => {
    render(React.createElement(Button, { href: '/test', children: 'Click' }));
    cleanup();
  }, { iterations: 50 });

  bench('Tag render', () => {
    render(React.createElement(Tag, null, 'React'));
    cleanup();
  }, { iterations: 50 });

  bench('GradientText render', () => {
    render(React.createElement(GradientText, null, 'Hello'));
    cleanup();
  }, { iterations: 50 });
});

// ── Molecules ─────────────────────────────────────────────────

describe('Benchmark — Molecules', () => {
  bench('SectionTitle render', () => {
    render(React.createElement(SectionTitle, { number: '01', label: 'Exp', title: 'Mon parcours' }));
    cleanup();
  }, { iterations: 50 });

  bench('ExperienceCard render', () => {
    render(React.createElement(ExperienceCard, { experience: exp, index: 0 }));
    cleanup();
  }, { iterations: 50 });
});

// ── API handlers ──────────────────────────────────────────────

// Mocked inline to avoid requiring vi.mock here
import { portfolioData } from '@/lib/mock-data';

describe('Benchmark — API handlers', () => {
  bench('sérialisation portfolioData', () => {
    JSON.stringify(portfolioData);
  }, { iterations: 200 });

  bench('sérialisation experiences seules', () => {
    JSON.stringify(portfolioData.experiences);
  }, { iterations: 200 });
});
