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
    password: z.string().min(6, 'Password should be at least 6 characters.'),
    repeatPassword: z.string()
}).superRefine((data, ctx) => {
    if (data.password !== data.repeatPassword) {
        ctx.addIssue({
            code: 'custom',
            message: 'Passwords do not match',
            path: [ 'repeatPassword' ]
        });
    }
});

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

    const supabase = createSupabaseClient();

    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault();

        const validatedFields = SignUpFormSchema.safeParse({
            firstName: firstName.trim(),
            lastName: lastName.trim() || undefined,
            email: email.trim(),
            password,
            repeatPassword
        });
        
        if (!validatedFields.success) {
            const errors = validatedFields.error.issues
                .map(issue => issue.message)
                .join('\n');
        
            setError(errors);
        
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const { data: existsData, error: existsErr } = await supabase.rpc(
                'user_email_exists',
                { check_email: validatedFields.data.email }
            );

            if (existsErr) {
                throw existsErr;
            }

            if (existsData) {
                throw new Error('User with this email already exists');
            }

            const avatarName = [
                validatedFields.data.firstName,
                validatedFields.data.lastName
            ].filter(Boolean).join('+');

            const { error } = await supabase.auth.signUp({
                email: validatedFields.data.email,
                password: validatedFields.data.password,
                options: {
                    data: {
                        first_name: validatedFields.data.firstName,
                        last_name: validatedFields.data.lastName || undefined,
                        avatar_url: normalizeUrl(`${ CONSTANTS.AVATAR_URL }/?background=d8fa99&color=222&bold=true&font-size=0.5&name=${ avatarName }`)
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
