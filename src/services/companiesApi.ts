import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cache } from 'react';

import createSupabaseServer from '@/lib/supabase/server';
import { categories, countries } from '@/mock/data';
import { pagesAuthLoginUrl, pagesCompaniesUrl, pagesCompanyUrl } from '@/routes';
import { CompanyInsertShema } from '@/shemas';
import { CompanyDetailsMapper, CompanyMapper } from '@/types';

type Key = keyof CompanyInsertShema;

export async function getCompanies(query: string) { 
    const supabase = await createSupabaseServer();

    let request = supabase
        .from('companies')
        .select(
            'category, country, has_promotions, id, joined_at, logo_url, name, status',
            { count: 'exact' }
        )
        .order('joined_at', { ascending: false });

    if (query.trim()) {
        request = request.ilike('name', `%${ query }%`);
    }

    const { data, count, error } = await request;

    if (error) {
        throw new Error(`Error loading companies: ${ error.message }`);
    }

    if (!data) {
        return {
            companies: [],
            count: 0
        };
    }

    return {
        companies: data as CompanyMapper[],
        count
    };
}

export const getCompanyById = cache(
    async function getCompanyById(id: string) {
        const supabase = await createSupabaseServer();
    
        const { data, error } = await supabase
            .from('companies')
            .select(`
        category,
        country,
        description,
        has_promotions,
        income,
        joined_at,
        logo_url,
        name,
        sold,
        status
        `)
            .eq('id', id)
            .single();

        if (error) {
            throw new Error(`Error loading company: ${ error.message }`);
        }

        if (!data) {
            return null;
        }

        return data as CompanyDetailsMapper;
    }
);

export async function createCompany(formData: FormData) {
    const supabase = await createSupabaseServer();
    
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
        throw new Error (`Authentication failed: ${ userError.message }`);
    }
    
    if (!user) {
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
        throw new Error (`Error creating company: ${ error.message }`);
    }
    
    redirect(pagesCompaniesUrl());
}

export async function updateCompany(id: string, formData: FormData) {
    const supabase = await createSupabaseServer();
   
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
    
    const { error } = await supabase
        .from('companies')
        .update(newCompany as CompanyInsertShema)
        .eq('id', id);

    if (error) {
        throw new Error(`Error updating company: ${ error.message }`);
    }
    
    redirect(pagesCompanyUrl(id));
}

export async function deleteCompany(id: string) {
    const supabase = await createSupabaseServer();

    const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/admin');
}