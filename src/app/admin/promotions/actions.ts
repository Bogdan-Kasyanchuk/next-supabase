'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/lib/supabase/server';
import { pagesPromotionsUrl } from '@/routes';

export async function getPromotions(query: string) {
    const supabase = await createClient();
    
    const { data, error } = await supabase.from('promotions').select(`
        cover_url,
        created_at,
        description,
        discount,
        id,
        name
        `).ilike('name', `%${ query }%`);

    if (error) {
        window.console.error('Error loading promotions:', error);
        throw new Error('Failed to load promotions');
    }

    return data;
}

export async function deletePromotion(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('promotions')
        .delete()
        .eq('id', id);

    if (error) {
        window.console.error('Error deleting promotion:', error);
        throw new Error('Failed to remove promotion');
    }

    revalidatePath(pagesPromotionsUrl());
}