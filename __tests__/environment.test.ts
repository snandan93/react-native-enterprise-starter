import {
  environmentProfiles,
  getEnvironmentConfig,
  useEnvironmentStore,
} from '@app/config/env';

describe('runtime environment configuration', () => {
  afterEach(() => {
    useEnvironmentStore.getState().setEnvironment('development');
  });

  it('provides typed defaults for all supported environments', () => {
    expect(environmentProfiles.development.useMockApi).toBe(true);
    expect(environmentProfiles.staging.useMockApi).toBe(true);
    expect(environmentProfiles.production.useMockApi).toBe(true);
    expect(environmentProfiles.production.logLevel).toBe('error');
  });

  it('resolves the newly selected environment without restarting', () => {
    useEnvironmentStore.getState().setEnvironment('staging');

    expect(getEnvironmentConfig()).toEqual(environmentProfiles.staging);
    expect(getEnvironmentConfig().apiBaseUrl).toBe(
      'https://staging-api.example.com/v1',
    );
  });
});
