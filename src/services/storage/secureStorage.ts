import * as Keychain from 'react-native-keychain';
import type {Session} from '@features/auth/types';

const SERVICE = 'enterprise.session';
export const secureSession = {
  async get(): Promise<Session | null> {
    const value = await Keychain.getGenericPassword({service: SERVICE});
    if (!value) return null;
    try { return JSON.parse(value.password) as Session; } catch { await this.clear(); return null; }
  },
  async set(session: Session) { await Keychain.setGenericPassword('session', JSON.stringify(session), {service: SERVICE, accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY}); },
  async clear() { await Keychain.resetGenericPassword({service: SERVICE}); },
};
