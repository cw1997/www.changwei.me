/**
 * @vitest-environment node
 */
import { describe, expect, it, vi, afterEach } from 'vitest';

import { GET } from './route';

describe('GET /api/changwei-resume-pdf', () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it('proxies Chinese PDF for zh-Hans locale', async () => {
    const buffer = new ArrayBuffer(4);
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      arrayBuffer: async () => buffer,
    } as unknown as Response);
    globalThis.fetch = fetchMock;

    const req = new Request('http://localhost/api/changwei-resume-pdf?locale=zh-Hans');
    const res = await GET(req);
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toBe('application/pdf');
    expect(res.headers.get('Content-Disposition')).toContain('changwei-resume.pdf');
    expect(res.headers.get('Content-Disposition')).toMatch(/^inline/);
    expect(res.headers.get('X-Content-Type-Options')).toBe('nosniff');

    const fetchUrl = fetchMock.mock.calls[0][0];
    expect(fetchUrl).toContain('changwei-resume.pdf');
    expect(fetchUrl).not.toContain('english');
  });

  it('proxies Chinese PDF for zh-Hant locale', async () => {
    const buffer = new ArrayBuffer(4);
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      arrayBuffer: async () => buffer,
    } as unknown as Response);
    globalThis.fetch = fetchMock;

    const req = new Request('http://localhost/api/changwei-resume-pdf?locale=zh-Hant');
    const res = await GET(req);
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Disposition')).toContain('changwei-resume.pdf');

    const fetchUrl = fetchMock.mock.calls[0][0];
    expect(fetchUrl).toContain('changwei-resume.pdf');
    expect(fetchUrl).not.toContain('english');
  });

  it('proxies English PDF for en-US locale', async () => {
    const buffer = new ArrayBuffer(4);
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      arrayBuffer: async () => buffer,
    } as unknown as Response);
    globalThis.fetch = fetchMock;

    const req = new Request('http://localhost/api/changwei-resume-pdf?locale=en-US');
    const res = await GET(req);
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Disposition')).toContain('changwei-resume-english.pdf');

    const fetchUrl = fetchMock.mock.calls[0][0];
    expect(fetchUrl).toContain('changwei-resume-english.pdf');
  });

  it('proxies English PDF for unknown locale', async () => {
    const buffer = new ArrayBuffer(4);
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      arrayBuffer: async () => buffer,
    } as unknown as Response);
    globalThis.fetch = fetchMock;

    const req = new Request('http://localhost/api/changwei-resume-pdf?locale=ja-JP');
    const res = await GET(req);
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Disposition')).toContain('changwei-resume-english.pdf');

    const fetchUrl = fetchMock.mock.calls[0][0];
    expect(fetchUrl).toContain('changwei-resume-english.pdf');
  });

  it('proxies English PDF when no locale param is provided', async () => {
    const buffer = new ArrayBuffer(4);
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      arrayBuffer: async () => buffer,
    } as unknown as Response);
    globalThis.fetch = fetchMock;

    const req = new Request('http://localhost/api/changwei-resume-pdf');
    const res = await GET(req);
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Disposition')).toContain('changwei-resume-english.pdf');
  });

  it('returns JSON error when upstream responds with non-OK', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 502,
    } as unknown as Response);

    const req = new Request('http://localhost/api/changwei-resume-pdf?locale=en-US');
    const res = await GET(req);
    expect(res.status).toBe(502);
    const body = await res.json();
    expect(body.error).toBeDefined();
  });

  it('returns 500 when fetch throws', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('network'));

    const req = new Request('http://localhost/api/changwei-resume-pdf?locale=en-US');
    const res = await GET(req);
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toBe('Internal Server Error');
  });
});
