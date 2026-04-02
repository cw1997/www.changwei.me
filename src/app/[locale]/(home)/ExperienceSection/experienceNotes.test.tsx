import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { experienceNoteFor } from './experienceNotes';

describe('experienceNoteFor', () => {
  it('renders English copy for risingwave', () => {
    render(<>{experienceNoteFor('en-US', 'risingwave')}</>);
    expect(
      screen.getByText(/Develop and maintain the official website/i),
    ).toBeInTheDocument();
  });

  it('renders Simplified Chinese for pingcap', () => {
    render(<>{experienceNoteFor('zh-Hans', 'pingcap')}</>);
    expect(screen.getByText(/中文官网/)).toBeInTheDocument();
  });

  it('renders Traditional Chinese for phd', () => {
    render(<>{experienceNoteFor('zh-Hant', 'phd')}</>);
    expect(
      screen.getByText(/研究助理，關注教育與 AI 融合相關主題/),
    ).toBeInTheDocument();
  });
});
