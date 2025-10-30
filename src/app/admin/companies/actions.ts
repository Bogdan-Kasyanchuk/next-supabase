'use server';

import { revalidatePath } from 'next/cache';

import createSupabaseServerClient from '@/lib/supabase/server';
import { CompanyMapper } from '@/types';

export async function getCompanies(page: number, limit: number, query: string) {
    const from = 0;
    const to = (page - 1) * limit + limit - 1;
  
    const supabase = await createSupabaseServerClient();

    let request = supabase
        .from('companies')
        .select(
            'category, country, has_promotions, id, joined_at, logo_url, name, status',
            { count: 'exact' }
        )
        .order('joined_at', { ascending: false })
        .range(from, to);

    if (query.trim()) {
        request = request.ilike('name', `%${ query }%`);
    }

    const { data, count, error } = await request;

    if (error || !data) {
        throw new Error(`Error loading companies: ${ error.message }`);
    }

    return {
        companies: data as CompanyMapper[],
        count
    };
}

export async function deleteCompany(id: string) {
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', id);

    if (error) {
        // eslint-disable-next-line no-console
        console.error('Error deleting company:', error.message);

        return;
    }

    revalidatePath('/admin');
}