import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { OutsideLink } from './OutsideLink';

describe('OutsideLink', () => {
  it('defaults target and rel for external links', () => {
    render(
      <OutsideLink href="https://example.com">Example</OutsideLink>,
    );
    const link = screen.getByRole('link', { name: 'Example' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('allows overriding target and rel', () => {
    render(
      <OutsideLink href="/local" target="_self" rel="nofollow">
        Local
      </OutsideLink>,
    );
    const link = screen.getByRole('link', { name: 'Local' });
    expect(link).toHaveAttribute('target', '_self');
    expect(link).toHaveAttribute('rel', 'nofollow');
  });

  it('falls back to href as link text when children omitted', () => {
    render(<OutsideLink href="https://example.com/path" />);
    expect(
      screen.getByRole('link', { name: 'https://example.com/path' }),
    ).toBeInTheDocument();
  });
});
