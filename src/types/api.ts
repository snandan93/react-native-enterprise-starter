export type AppErrorCode = 'NETWORK' | 'UNAUTHORIZED' | 'VALIDATION' | 'NOT_FOUND' | 'SERVER' | 'CANCELLED' | 'UNKNOWN';
export interface AppError {code: AppErrorCode; message: string; status?: number; retryable: boolean}
export type ApiResult<T> = {success: true; data: T} | {success: false; error: AppError};
