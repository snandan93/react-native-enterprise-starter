import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getEnvironmentConfig } from '@app/config/env';
import { secureSession } from '@services/storage/secureStorage';
import { logger } from '@services/logging/logger';
import type { AppError, ApiResult } from '../../types/api';
import type { Session } from '@features/auth/types';

export const apiClient = axios.create({
  headers: { Accept: 'application/json' },
});
let refreshPromise: Promise<Session> | null = null;
type RetryConfig = InternalAxiosRequestConfig & { _retried?: boolean };
const refresh = async (): Promise<Session> => {
  const session = await secureSession.get();
  if (!session) throw new Error('No refresh session');
  // Real deployments replace this endpoint. Mock auth bypasses Axios entirely.
  const { apiBaseUrl, apiTimeoutMs } = getEnvironmentConfig();
  const response = await axios.post<Session>(
    `${apiBaseUrl}/auth/refresh`,
    { refreshToken: session.refreshToken },
    { timeout: apiTimeoutMs },
  );
  await secureSession.set(response.data);
  return response.data;
};
apiClient.interceptors.request.use(async config => {
  const environment = getEnvironmentConfig();
  config.baseURL = environment.apiBaseUrl;
  config.timeout = environment.apiTimeoutMs;
  const session = await secureSession.get();
  if (session) config.headers.Authorization = `Bearer ${session.accessToken}`;
  logger.debug(config.method?.toUpperCase(), config.url);
  return config;
});
apiClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const config = error.config as RetryConfig | undefined;
    if (
      error.response?.status === 401 &&
      config &&
      !config._retried &&
      !config.url?.includes('/auth/refresh')
    ) {
      config._retried = true;
      refreshPromise ??= refresh().finally(() => {
        refreshPromise = null;
      });
      const session = await refreshPromise;
      config.headers.Authorization = `Bearer ${session.accessToken}`;
      return apiClient(config);
    }
    return Promise.reject(error);
  },
);
export const normalizeError = (cause: unknown): AppError => {
  if (axios.isCancel(cause))
    return {
      code: 'CANCELLED',
      message: 'Request cancelled',
      retryable: false,
    };
  if (axios.isAxiosError(cause)) {
    if (!cause.response)
      return {
        code: 'NETWORK',
        message: 'Check your connection and try again.',
        retryable: true,
      };
    const status = cause.response.status;
    return {
      code:
        status === 401
          ? 'UNAUTHORIZED'
          : status === 404
            ? 'NOT_FOUND'
            : status >= 500
              ? 'SERVER'
              : 'VALIDATION',
      message:
        status >= 500
          ? 'The service is temporarily unavailable.'
          : 'The request could not be completed.',
      status,
      retryable: status >= 500,
    };
  }
  return {
    code: 'UNKNOWN',
    message: 'Something unexpected happened.',
    retryable: false,
  };
};
export async function safeRequest<T>(
  request: () => Promise<T>,
): Promise<ApiResult<T>> {
  try {
    return { success: true, data: await request() };
  } catch (cause) {
    logger.error(cause);
    return { success: false, error: normalizeError(cause) };
  }
}
