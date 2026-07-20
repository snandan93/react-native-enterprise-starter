import { getEnvironmentConfig, LogLevel } from '@app/config/env';

const priorities: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
  silent: 50,
};

const enabled = (level: Exclude<LogLevel, 'silent'>) =>
  priorities[level] >= priorities[getEnvironmentConfig().logLevel];

export const logger = {
  debug: (...values: readonly unknown[]) => {
    if (enabled('debug')) console.debug('[app]', ...values);
  },
  info: (...values: readonly unknown[]) => {
    if (enabled('info')) console.info('[app]', ...values);
  },
  warn: (...values: readonly unknown[]) => {
    if (enabled('warn')) console.warn('[app]', ...values);
  },
  error: (...values: readonly unknown[]) => {
    if (enabled('error')) console.error('[app]', ...values);
  },
};
