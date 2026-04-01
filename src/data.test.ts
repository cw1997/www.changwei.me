import { describe, expect, it } from 'vitest';

import {
  url_resume_pdf_github,
  url_resume_pdf_mirror,
  url_resume_pdf_release,
  url_resume_pdf_source,
} from './data';

describe('resume URL constants', () => {
  it('exports stable GitHub release and mirror paths', () => {
    expect(url_resume_pdf_github).toMatch(/^https:\/\/github\.com\/cw1997\/resume\/releases\/download\//);
    expect(url_resume_pdf_release).toBe(
      'https://github.com/cw1997/resume/releases',
    );
    expect(url_resume_pdf_mirror).toBe('/api/changwei-resume.pdf');
    expect(url_resume_pdf_source).toBe('https://github.com/cw1997/resume');
  });
});
