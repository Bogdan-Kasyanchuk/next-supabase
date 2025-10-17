'use server';

import { revalidatePath } from 'next/cache';

import createSupabaseServerClient from '@/lib/supabase/server';
import { CompanyMapper } from '@/types';

export async function getCompanies(query: string) {
    const supabase = await createSupabaseServerClient();
    
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

    if (error || !data) {
        throw new Error('Error loading companies:', error);
    }

    return data as CompanyMapper[];
}

export async function deleteCompany(id: string) {
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error('Error deleting company:', error);
    }

    revalidatePath('/admin');
}