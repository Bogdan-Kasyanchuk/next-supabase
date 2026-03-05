'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import Button from '@/components/ui/buttons/Button';
import Input from '@/components/ui/inputs/Input';
import { pagesAuthLoginUrl, pagesDashboardUrl } from '@/routes';
import { signUp } from '@/services/auth/api';

export default function SignUpForm() {
    const router = useRouter();
    
    const [ email, setEmail ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ repeatPassword, setRepeatPassword ] = useState('');
    const [ error, setError ] = useState<string | null>(null);
    const [ isLoading, setIsLoading ] = useState(false);

    const isFormDisabled =
        isLoading ||
        !firstName.trim() ||
        !email.trim() ||
        !password ||
        !repeatPassword;

    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault();

        setIsLoading(true);
        setError(null);

        try {
            const result = await signUp(
                email,
                password,
                repeatPassword,
                firstName,
                lastName
            );

            if (!result.success && result.error) {
                throw new Error(result.error);
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
            <h2 className="c-auth-form-block__title">Sign up</h2>

            <form
                onSubmit={ handleSignUp }
                className="c-auth-form-block__form"
            >
                <div className="c-auth-form-block__col-2">
                    <Input
                        type="text"
                        value={ firstName }
                        label="First name"
                        placeholder="John"
                        required
                        onChange={
                            e => {
                                setFirstName(e.target.value);
                                setError(null);
                            }
                        }
                    />

                    <Input
                        type="text"
                        value={ lastName }
                        label="Last name"
                        placeholder="Doe"
                        onChange={
                            e => {
                                setLastName(e.target.value);
                                setError(null);
                            }
                        }
                    />
                </div>

                <Input
                    type="email"
                    value={ email }
                    label="Email"
                    placeholder="email@example.com"
                    required
                    onChange={
                        e => {
                            setEmail(e.target.value);
                            setError(null);
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
                            setPassword(e.target.value);
                            setError(null);
                        }
                    }
                />

                <Input
                    type="password"
                    value={ repeatPassword }
                    label="Repeat password"
                    placeholder="Password"
                    required
                    onChange={
                        e => {
                            setRepeatPassword(e.target.value);
                            setError(null);
                        }
                    }
                />

                {
                    error &&
                    <div className="c-auth-form-block__error">
                        { error }
                    </div>
                }

                <Button
                    type="submit"
                    size="large"
                    className="w-full mt-2.5"
                    disabled={ isFormDisabled }
                    loading={ isLoading }
                >
                    Sign up
                </Button>
            </form>

            <div className="c-auth-form-block__text">
                Already have an account?{ ' ' }

                <Link href={ pagesAuthLoginUrl() }>
                    Login
                </Link>
            </div>
        </div>
    );
}
