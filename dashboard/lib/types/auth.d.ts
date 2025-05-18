import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    role: string;
    name: string;
    username: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      role: string;
      username: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    name: string;
    role: string;
    username: string;
  }
}

export interface AuthCredentials {
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  image: string;
}
