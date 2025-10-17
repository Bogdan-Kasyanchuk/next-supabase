'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import { PARAMETERS } from '@/helpers/parameters';
import createSupabaseBrowserClient from '@/lib/supabase/client';
import { pagesAuthLoginUrl, pagesAuthSignUpSuccessUrl, pagesDashboardUrl } from '@/routes';
import normalizeUrl from '@/utils/normalizeUrl';

import Button from '../ui/buttons/Button';
import Input from '../ui/inputs/Input';

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

    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault();

        if (password !== repeatPassword) {
            setPasswordMatchError('Passwords do not match');

            return;
        }
        
        const supabase = createSupabaseBrowserClient();

        setIsLoading(true);
        setError(undefined);
        setPasswordMatchError(undefined);

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: normalizeUrl(
                        `${ window.location.origin }/${ pagesDashboardUrl() }`
                    ),
                    data: {
                        first_name: firstName,
                        last_name: lastName || undefined,
                        avatar_url: normalizeUrl(`${ PARAMETERS.AVATAR_URL }/?background=d8fa99&color=222&bold=true&font-size=0.5&name=${ firstName + '+' + lastName }`)
                    }
                }
            });

            if (error) {
                throw error;
            }

            router.push(pagesAuthSignUpSuccessUrl());
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="c-form-block">
            <h2 className="c-form-block__title">Sign up</h2>
  
            <form
                onSubmit={ handleSignUp }
                className="c-form-block__form"
            >
                <div className="c-form-block__col-2">
                    <Input
                        type="text"
                        value={ firstName }
                        label="First name"
                        placeholder="John"
                        required
                        error={ error }
                        onChange={ 
                            e => {
                                setFirstName(e.target.value.trim());
                            } 
                        }
                    />

                    <Input
                        type="text"
                        value={ lastName }
                        label="Last name"
                        placeholder="Doe"
                        error={ error }
                        onChange={ 
                            e => {
                                setLastName(e.target.value.trim());
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
                    error={ error }
                    onChange={ 
                        e => {
                            setEmail(e.target.value.trim());
                        } 
                    }
                />

                <Input
                    type="password"
                    value={ password }
                    label="Password"
                    placeholder="Password"
                    required
                    error={ passwordMatchError || error }
                    onChange={ 
                        e => {
                            setPassword(e.target.value.trim());
                            setPasswordMatchError(undefined);
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
                        } 
                    }
                />
                
                <Button
                    type="submit"
                    className="w-full mt-2.5"
                    size="large"
                    disabled={ isLoading || !firstName || !email || !password }
                    loading={ isLoading }
                >
                    Sign up
                </Button>
            </form>

            <div className="c-form-block__text">
                Already have an account?{ ' ' }

                <Link href={ pagesAuthLoginUrl() }>
                    Login
                </Link>
            </div>
        </div>
    );
}
