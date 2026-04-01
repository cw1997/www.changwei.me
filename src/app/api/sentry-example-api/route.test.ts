/**
 * @vitest-environment node
 */
import { describe, expect, it } from 'vitest';

import { GET } from './route';

describe('GET /api/sentry-example-api', () => {
  it('throws the documented example error', () => {
    expect(() => GET()).toThrow('Sentry Example API Route Error');
  });
});
