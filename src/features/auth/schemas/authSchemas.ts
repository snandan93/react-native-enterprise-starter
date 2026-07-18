import {z} from 'zod';
export const loginSchema = z.object({email: z.email('Enter a valid email address'), password: z.string().min(8, 'Use at least 8 characters')});
export type LoginValues = z.infer<typeof loginSchema>;
export const forgotSchema = z.object({email: z.email('Enter a valid email address')});
export type ForgotValues = z.infer<typeof forgotSchema>;
