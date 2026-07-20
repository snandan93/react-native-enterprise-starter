import { create } from 'zustand';
import { preferences } from '@services/storage/storage';

export type EnvironmentName = 'development' | 'staging' | 'production';
export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'silent';

export interface EnvironmentConfig {
  name: EnvironmentName;
  appName: string;
  apiBaseUrl: string;
  apiTimeoutMs: number;
  logLevel: LogLevel;
  useMockApi: boolean;
}

export const environmentProfiles = {
  development: {
    name: 'development',
    appName: 'Enterprise Starter Dev',
    apiBaseUrl: 'https://dev-api.example.com/v1',
    apiTimeoutMs: 15_000,
    logLevel: 'debug',
    useMockApi: true,
  },
  staging: {
    name: 'staging',
    appName: 'Enterprise Starter Staging',
    apiBaseUrl: 'https://staging-api.example.com/v1',
    apiTimeoutMs: 12_000,
    logLevel: 'info',
    // Keep the starter runnable until this placeholder URL is replaced.
    useMockApi: true,
  },
  production: {
    name: 'production',
    appName: 'Enterprise Starter',
    apiBaseUrl: 'https://api.example.com/v1',
    apiTimeoutMs: 10_000,
    logLevel: 'error',
    // Keep the starter runnable until this placeholder URL is replaced.
    useMockApi: true,
  },
} as const satisfies Record<EnvironmentName, EnvironmentConfig>;

const isEnvironmentName = (
  value: string | undefined,
): value is EnvironmentName =>
  value === 'development' || value === 'staging' || value === 'production';
const savedEnvironment = preferences.get('environment');
const initialEnvironment: EnvironmentName = isEnvironmentName(savedEnvironment)
  ? savedEnvironment
  : 'development';

interface EnvironmentState {
  environment: EnvironmentName;
  setEnvironment: (environment: EnvironmentName) => void;
}

export const useEnvironmentStore = create<EnvironmentState>(set => ({
  environment: initialEnvironment,
  setEnvironment: environment => {
    preferences.set('environment', environment);
    set({ environment });
  },
}));

export const getEnvironmentConfig = (): EnvironmentConfig =>
  environmentProfiles[useEnvironmentStore.getState().environment];

export function useEnvironment() {
  const environment = useEnvironmentStore(state => state.environment);
  return {
    environment,
    config: environmentProfiles[environment],
    setEnvironment: useEnvironmentStore.getState().setEnvironment,
  };
}
