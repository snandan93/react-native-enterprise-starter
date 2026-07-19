import React, { PropsWithChildren, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import { useTheme } from '@app/providers/AppProviders';
import { useUIStore } from '@app/store/uiStore';
import { Button, Text } from '@components/atoms';
import { useTranslation } from '@localization';

export function ScreenContainer({
  children,
  scroll = true,
  testID,
}: PropsWithChildren<{ scroll?: boolean; testID?: string }>) {
  const t = useTheme();
  const content = <View style={styles.content}>{children}</View>;
  return (
    <SafeAreaView
      testID={testID}
      style={[styles.safe, { backgroundColor: t.colors.background }]}
    >
      {scroll ? (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.grow}
        >
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}
export function AppHeader({
  title,
  action,
}: {
  title: string;
  action?: { label: string; onPress: () => void };
}) {
  return (
    <View style={styles.header}>
      <Text variant="title">{title}</Text>
      {action ? (
        <Button
          title={action.label}
          variant="secondary"
          onPress={action.onPress}
        />
      ) : null}
    </View>
  );
}
export function OfflineBanner() {
  const theme = useTheme();
  const { t } = useTranslation();
  const network = useNetInfo();
  if (network.isConnected !== false) return null;
  return (
    <View
      accessibilityRole="alert"
      style={[styles.banner, { backgroundColor: theme.colors.warning }]}
    >
      <Text color={theme.colors.background}>{t('offline')}</Text>
    </View>
  );
}
export function ToastHost() {
  const t = useTheme();
  const toast = useUIStore(s => s.toast);
  const hide = useUIStore(s => s.hideToast);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(hide, 3000);
    return () => clearTimeout(timer);
  }, [toast, hide]);
  if (!toast) return null;
  return (
    <View
      accessibilityRole="alert"
      style={[styles.toast, { backgroundColor: t.colors.text }]}
    >
      <Text color={t.colors.background}>{toast}</Text>
    </View>
  );
}
export async function retryConnectivity() {
  await NetInfo.refresh();
}
const styles = StyleSheet.create({
  safe: { flex: 1 },
  grow: { flexGrow: 1 },
  content: { flex: 1, padding: 20, gap: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  banner: { paddingHorizontal: 16, paddingVertical: 8, alignItems: 'center' },
  toast: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
});
