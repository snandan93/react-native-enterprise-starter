import { useUIStore } from '@app/store/uiStore';

export const translations = {
  en: {
    dashboard: 'Dashboard',
    tasks: 'Tasks',
    profile: 'Profile',
    settings: 'Settings',
    appearance: 'Appearance',
    language: 'Language',
    english: 'English',
    hindi: 'Hindi',
    system: 'System',
    light: 'Light',
    dark: 'Dark',
    teamSummary: 'Here’s what your team is working on.',
    activeTasks: 'Active tasks',
    completed: 'Completed',
    complete: 'complete',
    team: 'Team',
    offline: 'You are offline. Cached data is shown.',
  },
  hi: {
    dashboard: 'डैशबोर्ड',
    tasks: 'कार्य',
    profile: 'प्रोफ़ाइल',
    settings: 'सेटिंग्स',
    appearance: 'दिखावट',
    language: 'भाषा',
    english: 'अंग्रेज़ी',
    hindi: 'हिन्दी',
    system: 'सिस्टम',
    light: 'हल्का',
    dark: 'गहरा',
    teamSummary: 'आपकी टीम अभी इन कार्यों पर काम कर रही है।',
    activeTasks: 'सक्रिय कार्य',
    completed: 'पूर्ण',
    complete: 'पूर्ण',
    team: 'टीम',
    offline: 'आप ऑफ़लाइन हैं। कैश किया गया डेटा दिखाया जा रहा है।',
  },
} as const;

export type Locale = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
export const translate = (locale: Locale, key: TranslationKey) =>
  translations[locale][key];

export function useTranslation() {
  const locale = useUIStore(state => state.locale);
  return { locale, t: (key: TranslationKey) => translate(locale, key) };
}
