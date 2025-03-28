import { Role } from '@prisma/client';
import { DefaultSession } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare global {
  interface Window {
    LemonSqueezy: any;
  }
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: Role;
    };
  }

  interface Profile {
    picture?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    role: Role;
  }
}

export type CookieConsent = {
  essential: boolean;
  analytics: boolean;
};

export type Alert = {
  message: string;
  type: 'failed' | 'success';
};

export type ErrorResponse = {
  ok: false;
  message: string;
};

export type SuccessResponse<T> = {
  ok: true;
  data: T;
};

export type Response<T> = SuccessResponse<T> | ErrorResponse;

export type Theme = 'light' | 'dark' | 'system';
