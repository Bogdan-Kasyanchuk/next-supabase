'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import z from 'zod';

import Button from '@/components/ui/buttons/Button';
import Input from '@/components/ui/inputs/Input';
import createSupabaseClient from '@/lib/supabase/client';
import { pagesAuthForgotPasswordUrl, pagesAuthSignUpUrl, pagesDashboardUrl } from '@/routes';

const LoginFormSchema = z.object({
    email: z.email('Please enter a valid email.'),
    password: z.string().min(6, 'Password should be at least 6 characters.')
});

export default function LoginForm() {
    const router = useRouter();

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState<string | undefined>(undefined);
    const [ isLoading, setIsLoading ] = useState(false);

    const isFormDisabled = isLoading || !email || !password; 

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        const validatedFields = LoginFormSchema.safeParse({ email, password });

        if (!validatedFields.success) {
            const properties = z.treeifyError(validatedFields.error).properties!;

            const errors = Object.values(properties).map(({ errors }) => errors[ 0 ]).join('\n');

            setError(errors);

            return;
        }

        const supabase = createSupabaseClient();

        setIsLoading(true);
        setError(undefined);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            
            if (error) {
                throw error;
            }

            router.push(pagesDashboardUrl());
            router.refresh();
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className={
                clsx('c-auth-form-block',
                    {
                        'c-auth-form-block--error': error
                    }
                )
            }
        >
            <h2 className="c-auth-form-block__title">Login</h2>

            <form
                onSubmit={ handleLogin }
                className="c-auth-form-block__form"
            >
                <Input
                    type="email"
                    value={ email }
                    label="Email"
                    placeholder="email@example.com"
                    required
                    onChange={ 
                        e => {
                            setEmail(e.target.value.trim());
                            setError(undefined);
                        } 
                    }
                />

                <Input
                    type="password"
                    value={ password }
                    label="Password"
                    placeholder="Password"
                    required
                    onChange={ 
                        e => {
                            setPassword(e.target.value.trim());
                            setError(undefined);
                        } 
                    }
                />

                {
                    error &&
                    <div className="c-auth-form-block__error">
                        { error }
                    </div>
                }

                <div className="c-auth-form-block__text">
                    <Link href={ pagesAuthForgotPasswordUrl() }>
                        Forgot your password?
                    </Link>
                </div>

                <Button
                    type="submit"
                    size="large"
                    className="w-full mt-2.5"
                    disabled={ isFormDisabled }
                    loading={ isLoading }
                >
                    Login
                </Button>
            </form>

            <div className="c-auth-form-block__text">
                Don&apos;t have an account?{ ' ' }

                <Link href={ pagesAuthSignUpUrl() }>
                    Sign up
                </Link>
            </div>
        </div>
    );
}
