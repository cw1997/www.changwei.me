/**
 * @vitest-environment node
 */
import { describe, expect, it, vi, afterEach } from 'vitest';

import { GET } from './route';

describe('GET /api/changwei-resume.pdf', () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it('proxies PDF bytes when upstream succeeds', async () => {
    const buffer = new ArrayBuffer(4);
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      arrayBuffer: async () => buffer,
    } as unknown as Response);

    const res = await GET();
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toBe('application/pdf');
    expect(res.headers.get('Content-Disposition')).toContain(
      'changwei-resume.pdf',
    );
  });

  it('returns JSON error when upstream responds with non-OK', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 502,
    } as unknown as Response);

    const res = await GET();
    expect(res.status).toBe(502);
    const body = await res.json();
    expect(body.error).toBeDefined();
  });

  it('returns 500 when fetch throws', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('network'));

    const res = await GET();
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toBe('Internal Server Error');
  });
});
