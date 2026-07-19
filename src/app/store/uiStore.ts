import { create } from 'zustand';
import { preferences } from '@services/storage/storage';
import type { ThemeMode } from '@theme/tokens';
import type { Locale } from '@localization';
interface UIState {
  themeMode: ThemeMode;
  locale: Locale;
  toast: string | null;
  setThemeMode: (mode: ThemeMode) => void;
  setLocale: (locale: Locale) => void;
  showToast: (message: string) => void;
  hideToast: () => void;
}
const saved = preferences.get('theme');
const savedLocale = preferences.get('locale');
const initialMode: ThemeMode =
  saved === 'light' || saved === 'dark' ? saved : 'system';
const initialLocale: Locale = savedLocale === 'hi' ? 'hi' : 'en';
export const useUIStore = create<UIState>(set => ({
  themeMode: initialMode,
  locale: initialLocale,
  toast: null,
  setThemeMode: themeMode => {
    preferences.set('theme', themeMode);
    set({ themeMode });
  },
  setLocale: locale => {
    preferences.set('locale', locale);
    set({ locale });
  },
  showToast: toast => set({ toast }),
  hideToast: () => set({ toast: null }),
}));
