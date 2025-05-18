'use server';

import { hash } from 'bcryptjs';

import { signIn } from '@/lib/auth';
import { AuthCredentials } from '@/types';
import db from '../db';

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, 'username' | 'password'>
) => {
  const { username, password } = params;
  try {
    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.log('Sign in error: ', error);
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { name, username, email, password, phone, image } = params;

  try {
    const existingUser = await db.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return { success: false, error: 'Usuário já existe' };
    }

    const hashedPassword = await hash(password, 12);

    await db.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        phone,
        image,
        role: 'root',
      },
    });

    await signInWithCredentials({ username, password });
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Erro ao criar usuário' };
  }
};
