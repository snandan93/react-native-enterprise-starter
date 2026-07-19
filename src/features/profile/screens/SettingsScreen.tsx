import React from 'react';
import { ScreenContainer, AppHeader } from '@components/organisms';
import { Button, Text } from '@components/atoms';
import { Card } from '@components/molecules';
import { useUIStore } from '@app/store/uiStore';
import type { ThemeMode } from '@theme/tokens';
import { useTranslation } from '@localization';
import type { Locale, TranslationKey } from '@localization';
export function SettingsScreen() {
  const mode = useUIStore(s => s.themeMode);
  const setThemeMode = useUIStore(s => s.setThemeMode);
  const setLocale = useUIStore(s => s.setLocale);
  const { locale, t } = useTranslation();
  const options: ThemeMode[] = ['system', 'light', 'dark'];
  const locales: Locale[] = ['en', 'hi'];
  const localeKeys: Record<Locale, TranslationKey> = {
    en: 'english',
    hi: 'hindi',
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
    </ScreenContainer>
  );
}
