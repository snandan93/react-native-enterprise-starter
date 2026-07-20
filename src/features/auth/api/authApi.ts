import type { ApiResult } from '../../../types/api';
import type { Session } from '../types';
import { getEnvironmentConfig } from '@app/config/env';
import { apiClient, safeRequest } from '@services/api/client';
const wait = (ms = 350) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));
export const authApi = {
  async login(email: string, password: string): Promise<ApiResult<Session>> {
    if (!getEnvironmentConfig().useMockApi) {
      return safeRequest(
        async () =>
          (await apiClient.post<Session>('/auth/login', { email, password }))
            .data,
      );
    }
    await wait();
    if (
      email.toLowerCase() !== 'demo@enterprise.dev' ||
      password !== 'Password123!'
    )
      return {
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Email or password is incorrect.',
          status: 401,
          retryable: false,
        },
      };
    return {
      success: true,
      data: {
        accessToken: `mock-access-${Date.now()}`,
        refreshToken: 'mock-refresh',
        expiresAt: Date.now() + 3_600_000,
        user: { id: 'u1', name: 'Aarav Sharma', email, role: 'admin' },
      },
    };
  },
  async forgotPassword(email: string): Promise<ApiResult<true>> {
    if (!getEnvironmentConfig().useMockApi) {
      return safeRequest(async () => {
        await apiClient.post('/auth/forgot-password', { email });
        return true as const;
      });
    }
    await wait();
    return { success: true, data: true };
  },
};
