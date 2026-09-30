import { describe, expect, it } from 'vitest';

import { getExperienceData } from './buildExperienceData';

function t(key: string): string {
  return key;
}

describe('getExperienceData', () => {
  it('returns work and education sections with expected ids', () => {
    const data = getExperienceData('en-US', t);
    expect(data).toHaveLength(2);
    expect(data[0].category_key).toBe('work');
    expect(data[1].category_key).toBe('education');
    expect(data[0].items.map((i) => i.id)).toEqual(['mininggoat', 'risingwave', 'pingcap']);
    expect(data[1].items.map((i) => i.id)).toEqual([
      'phd-ntnu',
      'master-ntust',
      'bachelor-ntust',
      'junior-wspc',
    ]);
  });

  it('passes translation keys through t()', () => {
    const data = getExperienceData('zh-Hans', t);
    const mininggoat = data[0].items[0];
    expect(mininggoat.name).toBe('roleFrontendSysOps');
    expect(mininggoat.organization).toBe('orgMininggoat');
    expect(mininggoat.department).toBe('deptWebFrontendSysOps');
  });

  it('orders work experience most-recent-first', () => {
    const data = getExperienceData('en-US', t);
    const starts = data[0].items.map((i) => i.time_range.start);
    expect([...starts].sort().reverse()).toEqual(starts);
  });

  it('includes the registered legal entity for each employer', () => {
    const data = getExperienceData('en-US', t);
    for (const item of data[0].items) {
      expect(item.legal_entity, `${item.id} should expose a legal entity`).toBeTruthy();
    }
  });

  it('uses the remote location for fully-remote roles', () => {
    const data = getExperienceData('en-US', t);
    expect(data[0].items[0].location).toBe('locRemote');
    expect(data[0].items[1].location).toBe('locRemote');
  });

  it('provides a logo for every item so the monogram fallback is never shown', () => {
    const data = getExperienceData('en-US', t);
    for (const category of data) {
      for (const item of category.items) {
        expect(item.icon, `${item.id} should have a logo`).toBeTruthy();
      }
    }
  });

  it('exposes a note for every item', () => {
    const data = getExperienceData('en-US', t);
    for (const category of data) {
      for (const item of category.items) {
        expect(item.note, `${item.id} should have a note`).toBeTruthy();
      }
    }
  });

  it('uses a concrete end date for the junior college entry', () => {
    const data = getExperienceData('en-US', t);
    const wspc = data[1].items[3];
    expect(wspc.time_range).toEqual({ start: '2015/09', end: '2018/08' });
  });

  it('renders the PhD as ongoing', () => {
    const data = getExperienceData('en-US', t);
    expect(data[1].items[0].time_range.end).toBe('timeNow');
  });

  it('includes tag lists for technical roles', () => {
    const data = getExperienceData('en-US', t);
    const risingwave = data[0].items[1];
    expect(risingwave.tags).toContain('React');
    expect(risingwave.tags).toContain('TypeScript');
    const master = data[1].items[1];
    expect(master.tags.length).toBeGreaterThan(0);
  });

  it('never produces duplicate ids within a category', () => {
    const data = getExperienceData('zh-Hant', t);
    for (const category of data) {
      const ids = category.items.map((i) => i.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it('never produces duplicate tags within an item', () => {
    const data = getExperienceData('en-US', t);
    for (const category of data) {
      for (const item of category.items) {
        expect(new Set(item.tags).size, `${item.id} has duplicate tags`).toBe(item.tags.length);
      }
    }
  });
});