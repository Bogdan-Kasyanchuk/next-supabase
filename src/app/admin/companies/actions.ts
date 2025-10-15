'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/lib/supabase/server';
import { pagesCompaniesUrl } from '@/routes';

export async function getCompanies(query: string) {
    const supabase = await createClient();
    
    const { data, error } = await supabase.from('companies').select(`
        category,
        country,
        has_promotions,
        id,
        joined_at,
        logo_url,
        name,
        status
        `).ilike('name', `%${ query }%`);

    if (error) {
        window.console.error('Error loading companies:', error);
        throw new Error('Failed to load companies');
    }

    return data;
}

export async function deleteCompany(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', id);

    if (error) {
        window.console.error('Error deleting company:', error);
        throw new Error('Failed to remove company');
    }

    revalidatePath(pagesCompaniesUrl());
}