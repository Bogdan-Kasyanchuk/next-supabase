'use server';

import { revalidatePath } from 'next/cache';

import createSupabaseServerClient from '@/lib/supabase/server';
import { PromotionMapper } from '@/types';

export async function getPromotions(query: string) {
    const supabase = await createSupabaseServerClient();
    
    const { data, error } = await supabase.from('promotions').select(`
        cover_url,
        start_at,
        end_at,
        discount,
        id,
        name
        `).ilike('name', `%${ query }%`);

    if (error || !data) {
        throw new Error('Error loading promotions:', error);
    }

    return data as PromotionMapper[];
}

export async function deletePromotion(id: string) {
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase
        .from('promotions')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error('Error deleting promotion:', error);
    }

    revalidatePath('/admin');
}