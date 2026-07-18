import React, {createContext, PropsWithChildren, useContext, useEffect, useMemo} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Provider} from 'react-redux';
import {QueryClient, QueryClientProvider, onlineManager} from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import {store} from '@app/store';
import {resolveTheme, AppTheme} from '@theme/tokens';
import {useUIStore} from '@app/store/uiStore';

const ThemeContext = createContext<AppTheme | null>(null);
export const useTheme = () => {const value = useContext(ThemeContext); if (!value) throw new Error('useTheme must be used inside AppProviders'); return value;};
const queryClient = new QueryClient({defaultOptions: {queries: {retry: (count, error) => count < 2 && (error as {retryable?: boolean}).retryable !== false, gcTime: 24 * 60 * 60 * 1000}, mutations: {retry: false}}});
function Inner({children}: PropsWithChildren) {
  const system = useColorScheme();
  const mode = useUIStore(state => state.themeMode);
  const theme = useMemo(() => resolveTheme(mode, system), [mode, system]);
  useEffect(() => NetInfo.addEventListener(state => onlineManager.setOnline(Boolean(state.isConnected))), []);
  return <ThemeContext.Provider value={theme}><StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor={theme.colors.background}/>{children}</ThemeContext.Provider>;
}
export function AppProviders({children}: PropsWithChildren) {return <Provider store={store}><QueryClientProvider client={queryClient}><Inner>{children}</Inner></QueryClientProvider></Provider>;}
