'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

import createSupabaseBrowserClient from '@/lib/supabase/client';
import { pagesAuthLoginUrl, pagesAuthUpdatePasswordUrl } from '@/routes';

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
        <div className="c-form-block">
            {
                isSuccess
                    ? <>
                        <h2 className="c-form-block__title">Check Your Email</h2>

                        <div className="c-form-block__text">
                            <p>Password reset instructions sent.</p>

                            <p>
                                If you registered using your email and password, you will receive a password reset email.
                            </p>
                        </div> 
                    </>
                    : <>
                        <h2 className="c-form-block__title">Reset your password</h2>

                        <form
                            onSubmit={ handleForgotPassword }
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
                                        setEmail(e.target.value.trim());
                                    } 
                                }
                            />

                            <Button
                                type="submit"
                                className="w-full mt-2.5"
                                size="large"
                                disabled={ isLoading || !email }
                                loading={ isLoading }
                            >
                                Send reset email
                            </Button>
                        </form>
                        
                        <div className="c-form-block__text">
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
