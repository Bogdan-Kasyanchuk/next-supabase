'use server';

import createSupabaseServerClient from '@/lib/supabase/server';
import { PromotionDetailsMapper } from '@/types';

export async function getPromotionById(id: string) {
    const supabase = await createSupabaseServerClient();
    
    const { data, error } = await supabase.from('promotions').select().eq('id', id).single();

    if (error || !data) {
        throw new Error('Error loading promotion:', error);
    }

    return data as PromotionDetailsMapper;
}