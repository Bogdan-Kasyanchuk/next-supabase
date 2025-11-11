'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

import createSupabaseBrowserClient from '@/lib/supabase/client';
import { pagesAuthLoginUrl, pagesAuthUpdatePasswordUrl } from '@/routes';
import cn from '@/utils/cn';

import Button from '../ui/buttons/Button';
import Input from '../ui/inputs/Input';

export default function ForgotPasswordForm() {
    const [ email, setEmail ] = useState('');
    const [ error, setError ] = useState<string | undefined>(undefined);
    const [ isSuccess, setIsSuccess ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    const handleForgotPassword = async (e: FormEvent) => {
        e.preventDefault();

        const supabase = createSupabaseBrowserClient();

        setIsLoading(true);
        setError(undefined);

        try {
            // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${ window.location.origin }${ pagesAuthUpdatePasswordUrl() }`
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
                cn('c-auth-form-block',
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
                                        setEmail(e.target.value.trim());
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
                                disabled={ isLoading || !email }
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
