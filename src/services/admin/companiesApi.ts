import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cache } from 'react';

import { categories, countries } from '@/datasets/constants';
import createSupabaseServer from '@/lib/supabase/server';
import { pagesAuthLoginUrl, pagesCompaniesUrl, pagesCompanyUrl } from '@/routes';
import { CompanyInsertSchema } from '@/schemas';
import { CompanyDetailsMapper, CompanyMapper } from '@/types';

import { CompanyFieldKey } from './types';

type CompanyFieldValue = string | number | { label: string, value: string };

const NUMERIC_COMPANY_FIELDS = new Set<CompanyFieldKey>([ 'income', 'sold' ]);

function buildCompanyFromFormData(formData: FormData) {
    const company: Partial<Record<CompanyFieldKey, CompanyFieldValue>> = {};

    for (const [ key, value ] of formData.entries()) {
        if (!value || typeof value !== 'string') {
            continue;
        }

        if (key === 'country' || key === 'category') {
            const source = key === 'country' ? countries : categories;
            const option = source.find(i => i.value === value);

            if (!option) {
                throw new Error(`Invalid ${ key } value: "${ value }".`);
            }

            company[ key ] = {
                label: option.label,
                value
            };
        } else if (NUMERIC_COMPANY_FIELDS.has(key as CompanyFieldKey)) {
            const numericValue = Number(value);

            if (Number.isNaN(numericValue)) {
                throw new Error(`Invalid ${ key } value: "${ value }".`);
            }

            company[ key as CompanyFieldKey ] = numericValue;
        } else {
            company[ key as CompanyFieldKey ] = value;
        }
    }

    return company;
}

export async function getCompanies(query: string) { 
    const supabase = await createSupabaseServer();

    let request = supabase
        .from('companies')
        .select('category, country, has_promotions, id, joined_at, logo_url, name, status')
        .order('joined_at', { ascending: false });

    if (query.trim()) {
        request = request.ilike('name', `%${ query }%`);
    }

    const { data, error } = await request;

    if (error) {
        throw new Error(`Error loading companies: ${ error.message }`);
    }

    if (!data) {
        return [];
    }

    return data as CompanyMapper[];
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
    
    const newCompany = buildCompanyFromFormData(formData);

    newCompany.user_id = user.id;

    const { error } = await supabase
        .from('companies')
        .insert(newCompany as CompanyInsertSchema);

    if (error) {
        throw new Error (`Error creating company: ${ error.message }`);
    }
    
    redirect(pagesCompaniesUrl());
}

export async function updateCompany(id: string, formData: FormData) {
    const supabase = await createSupabaseServer();

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        throw new Error(`Authentication failed: ${ userError.message }`);
    }

    if (!user) {
        redirect(pagesAuthLoginUrl());
    }

    const newCompany = buildCompanyFromFormData(formData);

    const { data, error } = await supabase
        .from('companies')
        .update(newCompany as CompanyInsertSchema)
        .eq('id', id)
        .eq('user_id', user.id)
        .select('id');

    if (error) {
        throw new Error(`Error updating company: ${ error.message }`);
    }

    if (!data || data.length === 0) {
        throw new Error('Company not found or you do not have permission to update it.');
    }

    redirect(pagesCompanyUrl(id));
}

export async function deleteCompany(id: string) {
    const supabase = await createSupabaseServer();

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        throw new Error(`Authentication failed: ${ userError.message }`);
    }

    if (!user) {
        redirect(pagesAuthLoginUrl());
    }

    const { data, error } = await supabase
        .from('companies')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)
        .select('id');

    if (error) {
        throw new Error(error.message);
    }

    if (!data || data.length === 0) {
        throw new Error('Company not found or you do not have permission to delete it.');
    }

    revalidatePath('/admin');
}