'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import createSupabaseBrowserClient from '@/lib/supabase/client';
import { pagesDashboardUrl } from '@/routes';

import Button from '../ui/buttons/Button';
import Input from '../ui/inputs/Input';

export default function UpdatePasswordForm() {
    const router = useRouter();
    
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState<string | undefined>(undefined);
    const [ isLoading, setIsLoading ] = useState(false);

    const handleForgotPassword = async (e: FormEvent) => {
        e.preventDefault();

        const supabase = createSupabaseBrowserClient();

        setIsLoading(true);
        setError(undefined);

        try {
            const { error } = await supabase.auth.updateUser({ password });

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
        <div className="c-auth-form-block">
            <h2 className="c-auth-form-block__title">Reset your password</h2>
            
            <form
                onSubmit={ handleForgotPassword }
                className="c-auth-form-block__form"
            >
                <Input
                    type="password"
                    value={ password }
                    label="New password"
                    placeholder="Password"
                    required
                    error={ error }
                    onChange={ 
                        e => {
                            setPassword(e.target.value.trim());
                        } 
                    }
                />

                <Button
                    type="submit"
                    size="large"
                    className="w-full mt-2.5"
                    disabled={ isLoading || !password }
                    loading={ isLoading }
                >
                    Save new password
                </Button>
            </form>
        </div>
    );
}
