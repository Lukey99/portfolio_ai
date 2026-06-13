import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Tag } from './Tag';

describe('Tag', () => {
  it('affiche son contenu', () => {
    render(<Tag>React</Tag>);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('applique la classe chip', () => {
    render(<Tag>TypeScript</Tag>);
    expect(screen.getByText('TypeScript')).toHaveClass('chip');
  });
});
