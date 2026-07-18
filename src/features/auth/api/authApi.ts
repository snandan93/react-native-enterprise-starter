import type {ApiResult} from '../../../types/api';
import type {Session} from '../types';
const wait = (ms = 350) => new Promise<void>(resolve => setTimeout(resolve, ms));
export const authApi = {
  async login(email: string, password: string): Promise<ApiResult<Session>> {
    await wait();
    if (email.toLowerCase() !== 'demo@enterprise.dev' || password !== 'Password123!') return {success: false, error: {code: 'UNAUTHORIZED', message: 'Email or password is incorrect.', status: 401, retryable: false}};
    return {success: true, data: {accessToken: `mock-access-${Date.now()}`, refreshToken: 'mock-refresh', expiresAt: Date.now() + 3_600_000, user: {id: 'u1', name: 'Aarav Sharma', email, role: 'admin'}}};
  },
  async forgotPassword(_email: string): Promise<ApiResult<true>> {await wait(); return {success: true, data: true};},
};
