export interface NotificationService {requestPermission(): Promise<boolean>; registerDevice(token: string): Promise<void>}
export const notifications: NotificationService = {requestPermission: async () => false, registerDevice: async () => undefined};
