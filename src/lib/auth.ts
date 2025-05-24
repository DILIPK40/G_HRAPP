import { getCookie } from 'cookies-next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

const jwtSecret = process.env.JWT_SECRET!; // Get your secret key from environment variables

if (!jwtSecret) {
  throw new Error('JWT_SECRET environment variable is not set.');
}

interface AuthPayload extends JwtPayload {
    userId: number;
    role: string;
}

export function verifyAuth(cookies: ReadonlyRequestCookies): AuthPayload | null {
    const authToken = getCookie('auth_token', { cookies });

    if (!authToken) {
        return null;
    }

    try {
        const decoded = jwt.verify(authToken, jwtSecret) as AuthPayload;
        return decoded;
    } catch (error) {
        console.error('JWT verification failed:', error);
        return null;
    }
}