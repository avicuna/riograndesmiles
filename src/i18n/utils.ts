// src/i18n/utils.ts
import en from './en.json';
import es from './es.json';

export type Locale = 'en' | 'es';
export const defaultLocale: Locale = 'en';
export const locales: Locale[] = ['en', 'es'];

export function getLocaleFromUrl(url: URL): Locale {
  const [, locale] = url.pathname.split('/');
  return locale === 'es' ? 'es' : 'en';
}

export function useTranslations(locale: Locale) {
  const translations: Record<string, any> = locale === 'es' ? es : en;
  const lookup = (key: string): any =>
    key.split('.').reduce((obj: any, k: string) => obj?.[k], translations);

  function t(key: string): string {
    return lookup(key) ?? key;
  }

  /**
   * Read a list from the translations (bullet points, FAQ items, service cards).
   * Defaults to `string[]`; pass a type for lists of objects, e.g. `t.list<{ q: string; a: string }>(key)`.
   * Throws if the key isn't a list, so a broken translation fails the build instead of shipping.
   */
  function list<T = string>(key: string): T[] {
    const value = lookup(key);
    if (!Array.isArray(value)) {
      throw new Error(`[i18n] Expected "${key}" to be a list in ${locale}.json`);
    }
    return value as T[];
  }

  return Object.assign(t, { list });
}

// Helper to get the alternate locale path
export function getAlternatePath(currentPath: string, currentLocale: Locale): string {
  if (currentLocale === 'en') {
    return `/es${currentPath}`;
  }
  return currentPath.replace(/^\/es/, '') || '/';
}
