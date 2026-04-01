import { describe, expect, it } from 'vitest';

import {
  defaultLocale,
  localeHtmlLang,
  localeLabels,
  locales,
  routing,
} from './routing';

describe('i18n routing', () => {
  it('lists supported locales and default', () => {
    expect(locales).toEqual(['en-US', 'zh-Hant', 'zh-Hans']);
    expect(defaultLocale).toBe('en-US');
  });

  it('maps each locale to a label and html lang', () => {
    for (const locale of locales) {
      expect(localeLabels[locale]).toBeTruthy();
      expect(localeHtmlLang[locale]).toBeTruthy();
    }
  });

  it('exposes next-intl routing config', () => {
    expect(routing.locales).toEqual(locales);
    expect(routing.defaultLocale).toBe(defaultLocale);
  });
});
