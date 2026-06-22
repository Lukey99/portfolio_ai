import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AIWorkflowSection } from './AIWorkflowSection';

describe('AIWorkflowSection', () => {
  it('rend sans erreur', () => {
    render(<AIWorkflowSection />);
  });

  it('affiche un titre de section h2', () => {
    render(<AIWorkflowSection />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('expose une section avec id "ai-workflow"', () => {
    const { container } = render(<AIWorkflowSection />);
    expect(container.querySelector('#ai-workflow, section')).toBeTruthy();
  });
});
