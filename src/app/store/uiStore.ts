import {create} from 'zustand';
import {preferences} from '@services/storage/storage';
import type {ThemeMode} from '@theme/tokens';
interface UIState {themeMode: ThemeMode; toast: string | null; setThemeMode: (mode: ThemeMode) => void; showToast: (message: string) => void; hideToast: () => void}
const saved = preferences.get('theme');
const initialMode: ThemeMode = saved === 'light' || saved === 'dark' ? saved : 'system';
export const useUIStore = create<UIState>(set => ({themeMode: initialMode, toast: null, setThemeMode: themeMode => {preferences.set('theme', themeMode); set({themeMode});}, showToast: toast => set({toast}), hideToast: () => set({toast: null})}));
