'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import z from 'zod';

import Button from '@/components/ui/buttons/Button';
import Input from '@/components/ui/inputs/Input';
import { CONSTANTS } from '@/datasets/constants';
import createSupabaseClient from '@/lib/supabase/client';
import { pagesAuthLoginUrl, pagesDashboardUrl } from '@/routes';
import normalizeUrl from '@/utils/normalizeUrl';

const SignUpFormSchema = z.object({
    firstName: z.string().min(3, 'First name should be at least 3 characters.'),
    lastName: z.string().optional(),
    email: z.email('Please enter a valid email.'),
    password: z.string().min(6, 'Password should be at least 6 characters.')
});

export default function SignUpForm() {
    const router = useRouter();
    
    const [ email, setEmail ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ repeatPassword, setRepeatPassword ] = useState('');
    const [ error, setError ] = useState<string | undefined>(undefined);
    const [ passwordMatchError, setPasswordMatchError ] = useState<string | undefined>(undefined);
    const [ isLoading, setIsLoading ] = useState(false);

    const isFormDisabled = isLoading || !firstName || !email || !password || !repeatPassword;

    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault();

        if (password !== repeatPassword) {
            setPasswordMatchError('Passwords do not match');

            return;
        }

        const validatedFields = SignUpFormSchema.safeParse({
            firstName,
            lastName,
            email,
            password
        });
        
        if (!validatedFields.success) {
            const properties = z.treeifyError(validatedFields.error).properties!;
        
            const errors = Object.values(properties).map(({ errors }) => errors[ 0 ]).join('\n');
        
            setError(errors);
        
            return;
        }

        const supabase = createSupabaseClient();

        setIsLoading(true);
        setError(undefined);
        setPasswordMatchError(undefined);

        try {
            const { data: existsData, error: existsErr } = await supabase.rpc(
                'user_email_exists',
                { check_email: email }
            );

            if (existsErr) {
                throw existsErr;
            }

            if (existsData) {
                throw new Error('User with this email already exists');
            }

            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        first_name: firstName,
                        last_name: lastName || undefined,
                        avatar_url: normalizeUrl(`${ CONSTANTS.AVATAR_URL }/?background=d8fa99&color=222&bold=true&font-size=0.5&name=${ firstName + '+' + lastName }`)
                    }
                }
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
                                setFirstName(e.target.value.trim());
                                setError(undefined);
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
                                setLastName(e.target.value.trim());
                                setError(undefined);
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
                    error={ passwordMatchError }
                    onChange={
                        e => {
                            setPassword(e.target.value.trim());
                            setPasswordMatchError(undefined);
                            setError(undefined);
                        }
                    }
                />

                <Input
                    type="password"
                    value={ repeatPassword }
                    label="Repeat password"
                    placeholder="Password"
                    required
                    error={ passwordMatchError }
                    onChange={
                        e => {
                            setRepeatPassword(e.target.value.trim());
                            setPasswordMatchError(undefined);
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
