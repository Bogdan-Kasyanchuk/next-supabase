'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import Button from '@/components/ui/buttons/Button';
import Input from '@/components/ui/inputs/Input';
import { pagesDashboardUrl } from '@/routes';
import { updatePassword } from '@/services/auth/api';

export default function UpdatePasswordForm() {
    const router = useRouter();
    
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState<string | null>(null);
    const [ isLoading, setIsLoading ] = useState(false);

    const isFormDisabled = isLoading || !password; 

    const handleForgotPassword = async (e: FormEvent) => {
        e.preventDefault();

        setIsLoading(true);
        setError(null);

        try {
            const result = await updatePassword( password );
            
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
            <h2 className="c-auth-form-block__title">Reset your password</h2>
            
            <form
                className="c-auth-form-block__form"
                onSubmit={ handleForgotPassword }
            >
                <Input
                    type="password"
                    value={ password }
                    label="New password"
                    placeholder="Password"
                    required
                    onChange={ 
                        e => {
                            setPassword(e.target.value);
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
                    Save new password
                </Button>
            </form>
        </div>
    );
}
