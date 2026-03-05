'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import z from 'zod';

import Button from '@/components/ui/buttons/Button';
import Input from '@/components/ui/inputs/Input';
import createSupabaseClient from '@/lib/supabase/client';
import { pagesAuthLoginUrl, pagesAuthUpdatePasswordUrl } from '@/routes';
import normalizeUrl from '@/utils/normalizeUrl';

const ForgotPasswordFormSchema = z.object({
    email: z.email('Please enter a valid email.')
});

export default function ForgotPasswordForm() {
    const [ email, setEmail ] = useState('');
    const [ error, setError ] = useState<string | null>(null);
    const [ isSuccess, setIsSuccess ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    const isFormDisabled = isLoading || !email.trim(); 

    const supabase = createSupabaseClient();

    const handleForgotPassword = async (e: FormEvent) => {
        e.preventDefault();

        const validatedFields = ForgotPasswordFormSchema.safeParse({ email: email.trim() });

        if (!validatedFields.success) {
            setError(validatedFields.error.issues[ 0 ].message);
        
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(
                validatedFields.data.email, {
                    redirectTo: normalizeUrl(
                        `${ window.location.origin }/${ pagesAuthUpdatePasswordUrl() }`
                    )
                });

            if (error) {
                throw error;
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
