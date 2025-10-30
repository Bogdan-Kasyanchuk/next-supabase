'use server';

import { revalidatePath } from 'next/cache';

import createSupabaseServerClient from '@/lib/supabase/server';
import { PromotionMapper } from '@/types';

export async function getPromotions(page: number, limit: number, query: string) {
    const from = 0;
    const to = (page - 1) * limit + limit - 1;
    
    const supabase = await createSupabaseServerClient();
    
    let request = supabase
        .from('promotions')
        .select(
            'cover_url, start_at, end_at, discount, id, name',
            { count: 'exact' }
        )
        .order('start_at', { ascending: false })
        .range(from, to);

    if (query.trim()) {
        request = request.ilike('name', `%${ query }%`);
    }

    const { data, count, error } = await request;

    if (error || !data) {
        throw new Error(`Error loading promotions: ${ error.message }`);
    }

    return {
        promotions: data as PromotionMapper[],
        count
    };
}

export async function deletePromotion(id: string) {
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase
        .from('promotions')
        .delete()
        .eq('id', id);

    if (error) {
        // eslint-disable-next-line no-console
        console.error('Error deleting promotion:', error.message);

        return;
    }

    revalidatePath('/admin');
}