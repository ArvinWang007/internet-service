import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const supportedLanguages = ['en', 'zh', 'ja', 'ar', 'es', 'ru', 'fr', 'de', 'pt', 'ko'];

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: supportedLanguages,
    backend: {
      loadPath: '/locales/{{lng}}/common.json',
    },
    detection: {
      order: ['cookie', 'localStorage', 'navigator'],
      caches: ['cookie'],
    },
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export const getDictionary = async (locale: string, origin: string) => {
  if (!supportedLanguages.includes(locale)) {
    locale = 'en';
  }

  const url = `${origin}/locales/${locale}/common.json`;
  console.log(`Fetching dictionary from URL: ${url}`);

  const res = await fetch(url);
  console.log(`Response status: ${res.status}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch dictionary. Status: ${res.status}`);
  }

  const text = await res.text();
  console.log(`Response text: ${text}`);

  try {
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error('Error fetching or parsing JSON:', error);
    console.error('Response text:', text);
    throw error;
  }
};

export default i18n;