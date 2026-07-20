import React from 'react';
import { ScreenContainer, AppHeader } from '@components/organisms';
import { Button, Text } from '@components/atoms';
import { Card } from '@components/molecules';
import { useUIStore } from '@app/store/uiStore';
import type { ThemeMode } from '@theme/tokens';
import { useTranslation } from '@localization';
import type { Locale, TranslationKey } from '@localization';
import {
  environmentProfiles,
  EnvironmentName,
  useEnvironment,
} from '@app/config/env';
import { queryClient } from '@app/providers/AppProviders';
import { secureSession } from '@services/storage/secureStorage';
import { useAppDispatch } from '@hooks/redux';
import { authActions } from '@features/auth/store/authSlice';
export function SettingsScreen() {
  const dispatch = useAppDispatch();
  const mode = useUIStore(s => s.themeMode);
  const setThemeMode = useUIStore(s => s.setThemeMode);
  const setLocale = useUIStore(s => s.setLocale);
  const { locale, t } = useTranslation();
  const { environment, setEnvironment } = useEnvironment();
  const options: ThemeMode[] = ['system', 'light', 'dark'];
  const locales: Locale[] = ['en', 'hi'];
  const localeKeys: Record<Locale, TranslationKey> = {
    en: 'english',
    hi: 'hindi',
  };
  const environments = Object.keys(environmentProfiles) as EnvironmentName[];
  const changeEnvironment = async (nextEnvironment: EnvironmentName) => {
    if (nextEnvironment === environment) return;
    setEnvironment(nextEnvironment);
    queryClient.clear();
    await secureSession.clear();
    dispatch(authActions.signedOut());
  };
  return (
    <ScreenContainer>
      <AppHeader title={t('settings')} />
      <Text variant="title">{t('appearance')}</Text>
      <Card>
        {options.map(item => (
          <Button
            key={item}
            title={`${t(item)}${mode === item ? ' ✓' : ''}`}
            variant={mode === item ? 'primary' : 'secondary'}
            onPress={() => setThemeMode(item)}
          />
        ))}
      </Card>
      <Text variant="title">{t('language')}</Text>
      <Card>
        {locales.map(item => (
          <Button
            key={item}
            testID={`language-${item}`}
            title={`${t(localeKeys[item])}${locale === item ? ' ✓' : ''}`}
            variant={locale === item ? 'primary' : 'secondary'}
            onPress={() => setLocale(item)}
          />
        ))}
      </Card>
      <Text variant="title">{t('environment')}</Text>
      <Card>
        {environments.map(item => (
          <Button
            key={item}
            testID={`environment-${item}`}
            title={`${t(item)}${environment === item ? ' ✓' : ''}`}
            variant={environment === item ? 'primary' : 'secondary'}
            onPress={() => void changeEnvironment(item)}
          />
        ))}
        <Text variant="caption">{t('environmentHint')}</Text>
        <Text variant="caption">
          {environmentProfiles[environment].apiBaseUrl}
        </Text>
      </Card>
    </ScreenContainer>
  );
}
