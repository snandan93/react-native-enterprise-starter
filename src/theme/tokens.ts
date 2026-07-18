import {ColorSchemeName} from 'react-native';

export type ThemeMode = 'light' | 'dark' | 'system';
const shared = {
  spacing: {xs: 4, sm: 8, md: 16, lg: 24, xl: 32},
  radius: {sm: 6, md: 12, lg: 20, pill: 999},
  typography: {caption: 12, body: 16, title: 22, display: 32},
  shadow: {shadowOpacity: 0.12, shadowRadius: 8, elevation: 3},
} as const;
export const themes = {
  light: {...shared, dark: false, colors: {background: '#F6F7FB', surface: '#FFFFFF', text: '#172033', muted: '#687086', primary: '#3157D5', onPrimary: '#FFFFFF', border: '#DFE3EC', danger: '#BA1A1A', success: '#177245', warning: '#8A5700', overlay: 'rgba(0,0,0,0.42)'}},
  dark: {...shared, dark: true, colors: {background: '#10131B', surface: '#191E2A', text: '#F3F5FA', muted: '#AAB2C5', primary: '#9CB1FF', onPrimary: '#12265E', border: '#353C4D', danger: '#FFB4AB', success: '#70DBA1', warning: '#F5C56B', overlay: 'rgba(0,0,0,0.68)'}},
} as const;
export type AppTheme = (typeof themes)[keyof typeof themes];
export const resolveTheme = (mode: ThemeMode, system: ColorSchemeName) => themes[mode === 'system' ? (system === 'dark' ? 'dark' : 'light') : mode];
