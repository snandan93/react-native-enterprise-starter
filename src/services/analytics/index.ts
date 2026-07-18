export interface Analytics {track(name: string, properties?: Readonly<Record<string, string | number | boolean>>): void; identify(userId: string): void}
export const analytics: Analytics = {track: (name, properties) => {if (__DEV__) console.debug('[analytics]', name, properties);}, identify: userId => {if (__DEV__) console.debug('[analytics] identify', userId);}};
