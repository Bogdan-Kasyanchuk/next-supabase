import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cache } from 'react';

import createSupabaseServer from '@/lib/supabase/server';
import { pagesCompanyUrl, pagesPromotionUrl } from '@/routes';
import { PromotionInsertShema } from '@/shemas';
import { PromotionDetailsMapper, PromotionMapper } from '@/types';

type Key = keyof PromotionInsertShema;

export async function getPromotions(query: string) {   
    const supabase = await createSupabaseServer();

    let request = supabase
        .from('promotions')
        .select('cover_url, start_at, end_at, discount, id, name')
        .order('start_at', { ascending: false });

    if (query.trim()) {
        request = request.ilike('name', `%${ query }%`);
    }

    const { data, error } = await request;

    if (error) {
        throw new Error(`Error loading promotions: ${ error.message }`);
    }

    if (!data) {
        return [];
    }

    return data as PromotionMapper[];
}

export const getPromotionById = cache(
    async function getPromotionById(id: string) {
        const supabase = await createSupabaseServer();
    
        const { data, error } = await supabase
            .from('promotions')
            .select('cover_url, start_at, end_at, discount, description, name')
            .eq('id', id)
            .single();

        if (error) {
            throw new Error(`Error loading promotion: ${ error.message }`);
        }

        if (!data) {
            return null;
        }

        return data as PromotionDetailsMapper;
    }
);

export async function getPromotionsByCompany(id: string, query: string) {
    const supabase = await createSupabaseServer();
    
    let request = supabase
        .from('promotions')
        .select('cover_url, start_at, end_at, discount, id, name')
        .eq('company_id', id);

    if (query.trim()) {
        request = request.ilike('name', `%${ query }%`);
    }

    const { data, error } = await request;

    if (error) {
        throw new Error(`Error loading promotion: ${ error.message }`);
    }

    if (!data) {
        return [];
    }

    return data as PromotionMapper[];
}

export async function createPromotion(companyId: string, formData: FormData) {
    const supabase = await createSupabaseServer();

    const newPromotion: Partial<Record<Key, any>> = {};

    for (const [ key, value ] of formData.entries()) {
        if (!value) {
            continue;
        }

        newPromotion[ key as Key ] = value;
    }
    
    newPromotion.company_id = companyId;

    const { error } = await supabase
        .from('promotions')
        .insert( newPromotion as PromotionInsertShema);

    if (error) {
        throw new Error(`Error creating promotion: ${ error.message }`);
    }
    
    redirect(pagesCompanyUrl(companyId));
}

export async function updatePromotion(id: string, formData: FormData) {
    const supabase = await createSupabaseServer();

    const newPromotion: Partial<Record<Key, any>> = {};

    for (const [ key, value ] of formData.entries()) {
        if (!value) {
            continue;
        }

        newPromotion[ key as Key ] = value;
    }

    const { error } = await supabase
        .from('promotions')
        .update(newPromotion as PromotionInsertShema)
        .eq('id', id);

    if (error) {
        throw new Error(`Error updating promotion: ${ error.message }`);
    }
    
    redirect(pagesPromotionUrl(id));
}

export async function deletePromotion(id: string) {
    const supabase = await createSupabaseServer();

    const { error } = await supabase
        .from('promotions')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/admin');
}