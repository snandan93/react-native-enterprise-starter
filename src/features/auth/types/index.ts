export interface User {id: string; name: string; email: string; role: 'admin' | 'member'}
export interface Tokens {accessToken: string; refreshToken: string; expiresAt: number}
export interface Session extends Tokens {user: User}
