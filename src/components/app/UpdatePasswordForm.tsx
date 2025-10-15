'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import createClient from '@/lib/supabase/client';
import { pagesDashboardUrl } from '@/routes';

import Button from '../ui/buttons/Button';
import Input from '../ui/inputs/Input';

export default function UpdatePasswordForm() {
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState<string | undefined>(undefined);
    const [ isLoading, setIsLoading ] = useState(false);
    const router = useRouter();

    const handleForgotPassword = async (e: FormEvent) => {
        e.preventDefault();

        const supabase = createClient();

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
        <div className="c-form-block">
            <h2 className="c-form-block__title">Reset your password</h2>
            
            <form
                onSubmit={ handleForgotPassword }
                className="c-form-block__form"
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
                            setPassword(e.target.value);
                        } 
                    }
                />

                <Button
                    type="submit"
                    className="w-full mt-2.5"
                    size="large"
                    disabled={ isLoading }
                    loading={ isLoading }
                >
                    Save new password
                </Button>
            </form>
        </div>
    );
}
