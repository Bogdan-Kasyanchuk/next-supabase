'use server';

import { redirect } from 'next/navigation';

import createSupabaseServerClient from '@/lib/supabase/server';
import { categories, countries } from '@/mock/data';
import { pagesAuthLoginUrl, pagesCompaniesUrl } from '@/routes';
import { CompanyInsertShema } from '@/shemas';

type Key = keyof CompanyInsertShema;

export async function createCompany(formData: FormData) {
    const supabase = await createSupabaseServerClient();
    
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
        // eslint-disable-next-line no-console
        console.error('User not found or authentication failed.');

        redirect(pagesAuthLoginUrl());
    }
    
    const newCompany: Partial<Record<Key, any>> = {};

    for (const [ key, value ] of formData.entries()) {
        if (!value) {
            continue;
        }

        if (key === 'country' || key === 'category') {
            const source = key === 'country' ? countries : categories;

            newCompany[ key ] = {
                label: source.find(i => i.value === value)!.label,
                value
            };
        } else {
            newCompany[ key as Key ] = value;
        }
    }
    
    newCompany.user_id = user.id;

    const { error } = await supabase
        .from('companies')
        .insert(newCompany as CompanyInsertShema);

    if (error) {
        // eslint-disable-next-line no-console
        console.error(`Error creating company: ${ error.message }`);

        return;
    }
    
    redirect(pagesCompaniesUrl());
}