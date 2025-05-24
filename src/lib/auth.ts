
// import { getCookie } from 'cookies-next'; // No longer using this for server-side reading in RootLayout
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { type ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

const jwtSecret = process.env.JWT_SECRET!;

if (!jwtSecret) {
  throw new Error('JWT_SECRET environment variable is not set.');
}

interface AuthPayload extends JwtPayload {
    userId: number;
    role: string;
}

export function verifyAuth(cookieStore: ReadonlyRequestCookies): AuthPayload | null {
    const authTokenCookie = cookieStore.get('auth_token'); // Directly use .get() on ReadonlyRequestCookies
    const authToken = authTokenCookie?.value;

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
