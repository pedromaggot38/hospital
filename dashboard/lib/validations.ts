import { z } from 'zod';

const usernameRegex = /^[a-zA-Z0-9]+$/;

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(4, 'Nome de usuário é obrigatório')
      .regex(
        usernameRegex,
        'O nome de usuário deve conter apenas letras e números'
      )
      .toLowerCase(),
    password: z.string().min(4, 'Senha é obrigatória'),
    passwordConfirm: z.string().min(4, 'Senha de confirmação é obrigatória'),
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('Email inválido').toLowerCase(),
    phone: z.string().optional(),
    image: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirm'],
  });

export const signInSchema = z.object({
  username: z.string(),
  password: z.string().min(4, 'Senha é obrigatória'),
});
