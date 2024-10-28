import { z } from 'zod';

export const idToken = z.string().describe('Id token');
export const accessToken = z.string().describe('Access token');
export const refreshToken = z.string().describe('Refresh token');

export type IdToken = z.infer<typeof idToken>;
export type AccessToken = z.infer<typeof accessToken>;
export type RefreshToken = z.infer<typeof refreshToken>;
