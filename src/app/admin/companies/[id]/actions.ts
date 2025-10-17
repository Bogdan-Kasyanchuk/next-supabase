'use server';

import createSupabaseServerClient from '@/lib/supabase/server';
import { CompanyDetailsMapper, PromotionMapper } from '@/types';

export async function getCompanyById(id: string) {
    const supabase = await createSupabaseServerClient();
    
    const { data, error } = await supabase.from('companies').select().eq('id', id).single();

    if (error || !data) {
        throw new Error('Error loading company:', error);
    }

    return data as CompanyDetailsMapper;
}

export async function getPromotionsByCompany(id: string, query: string) {
    const supabase = await createSupabaseServerClient();
    
    const { data, error } = await supabase.from('promotions').select(`
        cover_url,
        start_at,
        end_at,
        discount,
        id,
        name
        `).eq('company_id', id).ilike('name', `%${ query }%`);

    if (error || !data) {
        // throw new Error('Error loading promotions:', error);
        // eslint-disable-next-line no-console
        console.error('Error loading promotions:', error);
    }

    return data as PromotionMapper[];
}