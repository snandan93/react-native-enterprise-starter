import React from 'react';
import { ScreenContainer, AppHeader } from '@components/organisms';
import { Card } from '@components/molecules';
import { Badge, Text } from '@components/atoms';
import { useTasks } from '@features/tasks/hooks/useTasks';
import { useTranslation } from '@localization';
export function DashboardScreen() {
  const { data = [] } = useTasks();
  const done = data.filter(t => t.status === 'done').length;
  const { t } = useTranslation();
  return (
    <ScreenContainer>
      <AppHeader title={t('dashboard')} />
      <Text>{t('teamSummary')}</Text>
      <Card>
        <Text variant="display">{data.length}</Text>
        <Text>{t('activeTasks')}</Text>
      </Card>
      <Card>
        <Text variant="display">{done}</Text>
        <Text>{t('completed')}</Text>
        <Badge
          label={`${Math.round((done / Math.max(data.length, 1)) * 100)}% ${t('complete')}`}
          tone="success"
        />
      </Card>
      <Text variant="title">{t('team')}</Text>
      <Card>
        <Text>Aarav · Admin</Text>
        <Text>Meera · Product design</Text>
        <Text>Kabir · Engineering</Text>
      </Card>
    </ScreenContainer>
  );
}
