import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ContactItem } from './ContactItem';

const icon = <svg data-testid="icon" />;

describe('ContactItem', () => {
  it('affiche le label et la valeur', () => {
    render(<ContactItem icon={icon} label="Email" value="kevin@example.com" index={0} />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('kevin@example.com')).toBeInTheDocument();
  });

  it('rend un lien cliquable quand href est fourni', () => {
    render(<ContactItem icon={icon} label="Email" value="kevin@example.com" href="mailto:kevin@example.com" index={0} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'mailto:kevin@example.com');
  });

  it('ne rend pas de lien quand href est absent', () => {
    render(<ContactItem icon={icon} label="Localisation" value="Paris, France" index={0} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('affiche l\'icône', () => {
    render(<ContactItem icon={icon} label="Email" value="test" index={0} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
