'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { FormEvent, useState } from 'react';

// import { createCompanyAction } from '@/actions/companies';
import Button from '@/components/ui/buttons/Button';
import DatePicker from '@/components/ui/inputs/DatePicker';
import Input from '@/components/ui/inputs/Input';
import Select from '@/components/ui/inputs/Select';
import TextArea from '@/components/ui/inputs/TextArea';
import { categories, countries, statuses } from '@/mock/data';
import { randomImage } from '@/mock/randomImage';

export default function CreateCompanyForm() {
    const logo = randomImage(200, 200);

    const [ name, setName ] = useState('');
    const [ status, setStatus ] = useState<string | null>(null);
    const [ country, setCountry ] = useState<string | null>(null);
    const [ category, setCategory ] = useState<string | null>(null);
    const [ income, setIncome ] = useState('');
    const [ sold, setSold ] = useState('');
    const [ joinedAt, setJoinedAt ] = useState<string | null>(null);
    const [ description, setDescription ] = useState('');
    const [ error, setError ] = useState<string | null>(null);
    const [ isLoading, setIsLoading ] = useState(false);

    const isFormDisabled =
        isLoading ||
        !name.trim() ||
        !status ||
        !country ||
        !category;

    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault();
        
        setIsLoading(true);
        setError(null);

        // try {
        //     const result = await createCompanyAction(
        //         email,
        //         password,
        //         repeatPassword,
        //         firstName,
        //         lastName
        //     );
        
        //     if (!result.success && result.error) {
        //         throw new Error(result.error);
        //     }
        // } catch (error: unknown) {
        //     setError(error instanceof Error ? error.message : 'An error occurred');
        // } finally {
        //     setIsLoading(false);
        // }
    };

    return (
        <form
            className={
                clsx('c-company-form-block',
                    {
                        'c-company-form-block--error': error
                    }
                )
            }
            onSubmit={ handleSignUp }
        >
            <div className="c-company-form-block__form">
                <div className="c-company-form-block__inner md:pe-2.5">
                    <div>
                        <label
                            className="f-label"
                            htmlFor="logo"
                        >
                            Logo
                            <span className="f-label__asterix">&nbsp;*</span>
                        </label>

                        <Image
                            className="rounded-full w-[160px] h-[160px] mx-auto md:w-[199px] md:h-[199px]"
                            width={ 200 }
                            height={ 200 }
                            src={ logo }
                            alt="Logo"
                        />

                        <input
                            id="logo"
                            type="text"
                            name="logo_url"
                            defaultValue={ logo }
                            className="hidden"
                        />
                    </div>

                    <Input
                        type="text"
                        value={ name }
                        label="Name"
                        placeholder="Name"
                        autoComplete="off"
                        required
                        onChange={
                            e => {
                                setName(e.target.value);
                                setError(null);
                            }
                        }
                    />

                    <Select
                        value={ status }
                        label="Status"
                        placeholder="Select status"
                        options={ statuses }
                        required
                        onChange={
                            value => {
                                setStatus(value);
                                setError(null);
                            }
                        }
                    />

                    <Select
                        value={ country }
                        label="Country"
                        placeholder="Select country"
                        options={ countries }
                        required
                        onChange={
                            value => {
                                setCountry(value);
                                setError(null);
                            }
                        }
                    />
                </div>

                <div className="c-company-form-block__inner md:ps-2.5">
                    <Select
                        value={ category }
                        label="Category"
                        placeholder="Select category"
                        options={ categories }
                        required
                        onChange={
                            value => {
                                setCategory(value);
                                setError(null);
                            }
                        }
                    />
                    
                    <Input
                        type="number"
                        value={ income }
                        label="Income"
                        placeholder="Income"
                        onChange={
                            e => {
                                setIncome(e.target.value);
                                setError(null);
                            }
                        }
                    />

                    <Input
                        type="number"
                        value={ sold }
                        label="Sold"
                        placeholder="Sold"
                        onChange={
                            e => {
                                setSold(e.target.value);
                                setError(null);
                            }
                        }
                    />

                    <DatePicker
                        value={ joinedAt }
                        label="Joined date"
                        placeholder="DD.MM.YYYY"
                        onChange={
                            value => {
                                setJoinedAt(value);
                                setError(null);
                            }
                        }
                    />

                    <TextArea
                        value={ description }
                        label="Description"
                        placeholder="Description"
                        onChange={
                            e => {
                                setDescription(e.target.value);
                                setError(null);
                            }
                        }
                    />
                </div>
            </div>
            
            {
                error &&
                <div className="c-company-form-block__error">
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
                Create company
            </Button>
        </form>
    );
}