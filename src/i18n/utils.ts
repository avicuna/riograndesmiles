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
  return function t(key: string): string {
    return key.split('.').reduce((obj: any, k: string) => obj?.[k], translations) ?? key;
  };
}

// Helper to get the alternate locale path
export function getAlternatePath(currentPath: string, currentLocale: Locale): string {
  if (currentLocale === 'en') {
    return `/es${currentPath}`;
  }
  return currentPath.replace(/^\/es/, '') || '/';
}
