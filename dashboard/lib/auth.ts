import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';

import NextAuth, { User as NextAuthUser } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

import db from './db';

type UserWithImage = NextAuthUser & {
  image?: string | null;
  role: string;
  username: string;
};

export const { auth, handlers, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Usuário', type: 'text' },
        password: { label: 'Senha', type: 'password' },
      },
      authorize: async (credentials) => {
        if (
          !credentials ||
          typeof credentials.username !== 'string' ||
          typeof credentials.password !== 'string'
        ) {
          return null;
        }
        if (!credentials?.username || !credentials?.password) return null;

        const user = await db.user.findUnique({
          where: { username: credentials.username },
        });

        console.log(user);

        if (!user) return null;

        if (!user.active) return null;

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) return null;

        return {
          id: user.id,
          role: user.role,
          name: user.name,
          email: user.email,
          image: user.image ?? null, // pode ser null
          username: user.username,
        } satisfies UserWithImage;
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: UserWithImage }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.image = user.image;
        token.email = user.email;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string | null;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
});
