import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { experienceNoteFor } from './experienceNotes';
import type { ExperienceNoteKey } from './experienceNotes';

const ALL_KEYS: ExperienceNoteKey[] = [
  'mininggoat',
  'risingwave',
  'pingcap',
  'phd',
  'master',
  'bachelor',
  'wspc',
];

describe('experienceNoteFor', () => {
  it('renders English copy for risingwave', () => {
    render(<>{experienceNoteFor('en-US', 'risingwave')}</>);
    expect(
      screen.getByText(/Develop and maintain the official website/i),
    ).toBeInTheDocument();
  });

  it('renders Simplified Chinese for pingcap', () => {
    render(<>{experienceNoteFor('zh-Hans', 'pingcap')}</>);
    expect(screen.getByText(/从零开发 TiDB 中文社区官网/)).toBeInTheDocument();
  });

  it('renders Traditional Chinese for phd', () => {
    render(<>{experienceNoteFor('zh-Hant', 'phd')}</>);
    expect(
      screen.getByText(/研究助理，關注教育與 AI 融合相關主題/),
    ).toBeInTheDocument();
  });

  it('renders Mininggoat copy with the platform link', () => {
    render(<>{experienceNoteFor('en-US', 'mininggoat')}</>);
    expect(
      screen.getByRole('link', { name: 'https://washuyang.com/' }),
    ).toBeInTheDocument();
  });

  it('renders every note key for every locale without crashing', () => {
    for (const locale of ['en-US', 'zh-Hans', 'zh-Hant'] as const) {
      for (const key of ALL_KEYS) {
        const { unmount } = render(<>{experienceNoteFor(locale, key)}</>);
        // Notes nest lists, so assert at least one exists.
        expect(screen.getAllByRole('list').length, `${locale}/${key}`).toBeGreaterThan(0);
        expect(screen.getAllByRole('listitem').length, `${locale}/${key}`).toBeGreaterThan(0);
        unmount();
      }
    }
  });

  it('gives every Zhihu article link a non-empty title per locale', () => {
    // Guards the `ZHIHU_TITLES[locale]` lookup from producing undefined labels.
    for (const locale of ['en-US', 'zh-Hans', 'zh-Hant'] as const) {
      const { unmount } = render(<>{experienceNoteFor(locale, 'bachelor')}</>);
      const links = screen.getAllByRole('link', {
        name: /Writing an OS|从零开始写一个操作系统|從零開始寫一個作業系統/,
      });
      expect(links.length, locale).toBe(5);
      for (const link of links) {
        expect(link.textContent?.trim(), locale).toBeTruthy();
      }
      unmount();
    }
  });
});