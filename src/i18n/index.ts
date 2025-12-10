import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';

// Detect browser language
const getBrowserLanguage = (): string => {
    const browserLang = navigator.language.split('-')[0];
    return ['es', 'en'].includes(browserLang) ? browserLang : 'es';
};

// Get saved language or detect from browser
const getSavedLanguage = (): string => {
    const saved = localStorage.getItem('imaclean-language');
    if (saved && ['es', 'en'].includes(saved)) {
        return saved;
    }
    return getBrowserLanguage();
};

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            es: { translation: es },
        },
        lng: getSavedLanguage(),
        fallbackLng: 'es',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;

export const changeLanguage = (lang: string) => {
    localStorage.setItem('imaclean-language', lang);
    i18n.changeLanguage(lang);
};

export const getCurrentLanguage = () => i18n.language;
