'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

import Button from '@/components/ui/buttons/Button';
import Input from '@/components/ui/inputs/Input';
import { pagesAuthLoginUrl } from '@/routes';
import { forgotPassword } from '@/services/auth/api';

export default function ForgotPasswordForm() {
    const [ email, setEmail ] = useState('');
    const [ error, setError ] = useState<string | null>(null);
    const [ isSuccess, setIsSuccess ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    const isFormDisabled = isLoading || !email.trim(); 

    const handleForgotPassword = async (e: FormEvent) => {
        e.preventDefault();

        setIsLoading(true);
        setError(null);

        try {
            const result = await forgotPassword( email );

            if (!result.success && result.error) {
                throw new Error(result.error);
            }

            setIsSuccess(true);
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
            {
                isSuccess
                    ? <>
                        <h2 className="c-auth-form-block__title">Check Your Email</h2>

                        <div className="c-auth-form-block__text">
                            <p>Password reset instructions sent.</p>

                            <p>
                                If you registered using your email and password, you will receive a password reset email.
                            </p>
                        </div> 
                    </>
                    : <>
                        <h2 className="c-auth-form-block__title">Reset your password</h2>

                        <form
                            onSubmit={ handleForgotPassword }
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
                                        setEmail(e.target.value);
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
                                Send reset email
                            </Button>
                        </form>
                        
                        <div className="c-auth-form-block__text">
                            Already have an account?{ ' ' }

                            <Link href={ pagesAuthLoginUrl() }>
                                Login
                            </Link>
                        </div>
                    </>
            }
        </div>
    );
}
