'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import {
    DefaultValues,
    Path,
    SubmitHandler,
    useForm,
    UseFormReturn,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "./ui/button"
import { signInSchema, signUpSchema } from "@/lib/validations"
import { signInWithCredentials, signUp } from "@/lib/actions/auth"
import { toast } from 'sonner'
import { useRouter } from "next/navigation"

const FIELD_NAMES = {
    username: 'Username',
    password: 'Senha',
    passwordConfirm: 'Confirmação de senha',
    name: 'Nome',
    email: 'E-mail',
    phone: 'Celular',
    image: 'Foto de perfil'
}
const FIELD_TYPES = {
    username: 'text',
    password: 'password',
    passwordConfirm: 'password',
    name: 'text',
    email: 'email',
    phone: 'text',
    image: 'text'
}
const FIELD_PLACEHOLDERS = {
    username: 'Digite seu nome de usuário',
    password: 'Digite sua senha',
    passwordConfirm: 'Confirme sua senha',
    name: 'Digite seu nome',
    email: 'example@exam.com',
    phone: '99 99999-9999',
    image: 'https://github.com/{username}.png'
}

interface AuthFormProps {
    type: 'SIGN_IN' | 'SIGN_UP'
    defaultValues: Record<string, any>
    className?: string
}

const AuthForm = ({ type, defaultValues, className }: AuthFormProps) => {
    const router = useRouter()
    const schema = type === 'SIGN_IN' ? signInSchema : signUpSchema

    const form: UseFormReturn<any> = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<any>,
    })

    const handleSubmit: SubmitHandler<any> = async (data) => {
        try {
            if (type === 'SIGN_IN') {
                const result = await signInWithCredentials({
                    username: data.username,
                    password: data.password,
                });

                if (result?.success) {
                    toast.success('Login realizado com sucesso.');
                    router.push('/dashboard');
                } else {
                    toast.error(result?.error ?? 'Erro ao fazer login.');
                }

                return result;
            }

            if (type === 'SIGN_UP') {
                const result = await signUp({
                    name: data.name,
                    username: data.username,
                    password: data.password,
                    email: data.email,
                    phone: data.phone,
                    image: data.image
                });

                if (result?.success) {
                    toast.success('Cadastro de usuário root realizado com sucesso.');
                    router.push('/dashboard');
                } else {
                    toast.error(result?.error ?? 'Erro ao fazer o cadastro.');
                }

                return result;
            }

            return { success: false, error: 'Tipo de formulário inválido' };
        } catch (error) {
            console.error('Erro no formulário:', error);
            return { success: false, error: 'Falha ao enviar formulário' };
        }
    };


    const title = type === 'SIGN_IN' ? 'Bem-vindo de volta' : 'Crie sua conta'
    const description = type === 'SIGN_IN'
        ? 'Entre com seu nome de usuário e senha'
        : 'Preencha o formulário para a criação do usuário root'

    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className="flex flex-col gap-6"
                        >
                            {Object.keys(defaultValues).map((field) => (
                                <FormField
                                    key={field}
                                    control={form.control}
                                    name={field as Path<any>}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="capitalize">
                                                {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES] ?? field.name}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    required
                                                    placeholder={
                                                        FIELD_PLACEHOLDERS[field.name as keyof typeof FIELD_PLACEHOLDERS] ?? ''
                                                    }
                                                    type={
                                                        FIELD_TYPES[field.name as keyof typeof FIELD_TYPES] ?? 'text'
                                                    }
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}

                            <div className="mt-4 text-center text-sm">
                                <Button type="submit" className="w-full dark:text-white">
                                    {type === 'SIGN_IN' ? 'Login' : 'Criar conta'}
                                </Button>
                                {type === 'SIGN_IN' && (
                                    <div className="mt-4 text-center text-sm">
                                        <Link
                                            href="/forgot-password"
                                            className="underline underline-offset-4 hover:text-primary"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default AuthForm
