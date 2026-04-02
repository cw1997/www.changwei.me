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
    expect(data[0].items.map((i) => i.id)).toEqual(['risingwave', 'pingcap']);
    expect(data[1].items.map((i) => i.id)).toEqual([
      'phd-ntnu',
      'master-ntust',
      'bachelor-ntust',
      'junior-wspc',
    ]);
  });

  it('passes translation keys through t()', () => {
    const data = getExperienceData('zh-Hans', t);
    const risingwave = data[0].items[0];
    expect(risingwave.name).toBe('intern2Name');
    expect(risingwave.organization).toBe('orgRisingWave');
  });

  it('includes tag lists for technical roles', () => {
    const data = getExperienceData('en-US', t);
    const risingwave = data[0].items[0];
    expect(risingwave.tags).toContain('React');
    expect(risingwave.tags).toContain('TypeScript');
    const master = data[1].items[1];
    expect(master.tags.length).toBeGreaterThan(0);
  });
});
