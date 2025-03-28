import 'server-only';

import { getServerSession, NextAuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';
import db from '../config/prisma';
import { revalidateTag, unstable_cache } from 'next/cache';
import { unauthorized } from './messages';

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  pages: { signIn: '/auth/sign-in', error: '/auth/error' },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      if (profile && profile.name && profile.email && profile.picture) {
        const { name, email, picture: image } = profile;
        const user = await db.user.upsert({
          where: { email },
          update: { name, email, image },
          create: {
            name,
            email,
            image,
            role: 'USER',
          },
        });
        if (user.createdAt === user.updatedAt) revalidateTag('users');
        return true;
      }
      return false;
    },
    async jwt({ token, user }) {
      if (user && user.email) {
        const dbUser = await db.user.findUnique({
          where: { email: user.email },
          select: { id: true, role: true },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
        }
      }
      ['name', 'email', 'picture'].forEach((data) => delete token[data]);
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

const getCachedUser = unstable_cache(
  async (userId: string | undefined) => {
    try {
      if (!userId) throw new Error(unauthorized);
      const user = await db.user.findUnique({ where: { id: userId } });
      if (!user) throw new Error(unauthorized);
      return user;
    } catch (err) {
      throw err;
    }
  },
  [],
  { tags: ['user'] }
);
export async function authUser() {
  try {
    const session = await getServerSession(options);
    return await getCachedUser(session?.user.id);
  } catch (err) {
    throw err;
  }
}
