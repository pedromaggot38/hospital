'use server';

import { compare, hash } from 'bcryptjs';

import { signIn } from '@/lib/auth';
import { AuthCredentials } from '@/types/auth';
import db from '../db';

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, 'username' | 'password'>
) => {
  const { username, password } = params;

  try {
    const user = await db.user.findUnique({
      where: { username },
    });

    if (!user) {
      return {
        success: false,
        error: 'Usuário não encontrado.',
      };
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return {
        success: false,
        error: 'Usuário ou senha inválidos.',
      };
    }

    if (!user.active) {
      return {
        success: false,
        error: 'Usuário desativado. Contate o administrador.',
      };
    }

    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: 'Usuário ou senha inválidos.' };
    }

    return { success: true };
  } catch (error) {
    console.error('Erro inesperado no login:', error);
    return { success: false, error: 'Erro inesperado ao fazer login.' };
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
