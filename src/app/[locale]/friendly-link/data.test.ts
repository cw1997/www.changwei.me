import { describe, expect, it } from 'vitest';

import { getFriendlyLinkItems } from './data';

describe('getFriendlyLinkItems', () => {
  it('localizes names for en-US', () => {
    const items = getFriendlyLinkItems('en-US');
    expect(items[0].name).toContain("Chang Wei's Blog");
    expect(items[1].name).toContain('Massive Open Online Courses');
    expect(items[4].name).toContain('imuslab');
  });

  it('localizes names for zh-Hant', () => {
    const items = getFriendlyLinkItems('zh-Hant');
    expect(items[0].name).toContain('昌維');
    expect(items[1].name).toContain('大規模');
  });

  it('localizes names for zh-Hans', () => {
    const items = getFriendlyLinkItems('zh-Hans');
    expect(items[0].name).toContain('昌维');
    expect(items[1].name).toContain('大规模');
  });

  it('keeps shared entries and valid URLs', () => {
    for (const locale of ['en-US', 'zh-Hant', 'zh-Hans'] as const) {
      const items = getFriendlyLinkItems(locale);
      expect(items).toHaveLength(5);
      expect(items[3].name).toBe('Jiawei Du');
      expect(items[3].url).toMatch(/^https:\/\//);
      for (const item of items) {
        expect(item.url).toMatch(/^https:\/\//);
      }
    }
  });
});
