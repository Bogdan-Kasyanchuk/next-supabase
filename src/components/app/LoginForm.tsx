'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import createClient from '@/lib/supabase/client';
import { pagesAuthForgotPasswordUrl, pagesAuthSignUpUrl, pagesDashboardUrl } from '@/routes';

import Button from '../ui/buttons/Button';
import Input from '../ui/inputs/Input';

export default function LoginForm() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState<string | undefined>(undefined);
    const [ isLoading, setIsLoading ] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        const supabase = createClient();

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
        <div className="c-form-block">
            <h2 className="c-form-block__title">Login</h2>

            <form
                onSubmit={ handleLogin }
                className="c-form-block__form"
            >
                <Input
                    type="email"
                    value={ email }
                    label="Email"
                    placeholder="email@example.com"
                    required
                    error={ error }
                    onChange={ 
                        e => {
                            setEmail(e.target.value);
                        } 
                    }
                />

                <Input
                    type="password"
                    value={ password }
                    label="Password"
                    placeholder="Password"
                    required
                    error={ error }
                    onChange={ 
                        e => {
                            setPassword(e.target.value);
                        } 
                    }
                />

                <div className="c-form-block__text">
                    <Link href={ pagesAuthForgotPasswordUrl() }>
                        Forgot your password?
                    </Link>
                </div>

                <Button
                    type="submit"
                    className="w-full mt-2.5"
                    size="large"
                    disabled={ isLoading }
                    loading={ isLoading }
                >
                    Login
                </Button>
            </form>

            <div className="c-form-block__text">
                Don&apos;t have an account?{ ' ' }

                <Link href={ pagesAuthSignUpUrl() }>
                    Sign up
                </Link>
            </div>
        </div>
    );
}
