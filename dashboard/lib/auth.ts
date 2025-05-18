import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';

import NextAuth from 'next-auth';
import db from './db';
export const { auth, handlers, signIn, signOut } = NextAuth({
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

        if (!user) return null;

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) return null;

        return {
          id: user.id,
          namename: user.username,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        //      token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        //     session.user.role = token.role as string;
      }
      return session;
    },
  },
});
