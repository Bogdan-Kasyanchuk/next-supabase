'use server';

import createSupabaseServerClient from '@/lib/supabase/server';
import { PromotionDetailsMapper } from '@/types';

export async function getPromotionById(id: string) {
    const supabase = await createSupabaseServerClient();
    
    const { data, error } = await supabase.from('promotions').select(`
        cover_url,
        start_at,
        end_at,
        discount,
        description,
        name
        `).eq('id', id).single();

    if (error || !data) {
        throw new Error(`Error loading promotion: ${ error.message }`);
    }

    return data as PromotionDetailsMapper;
}