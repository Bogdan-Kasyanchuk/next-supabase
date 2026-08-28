import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cache } from 'react';

import createSupabaseServer from '@/lib/supabase/server';
import { pagesAuthLoginUrl, pagesCompanyUrl, pagesPromotionUrl } from '@/routes';
import { PromotionInsertSchema } from '@/schemas';
import { PromotionDetailsMapper, PromotionMapper } from '@/types';

import { PromotionFieldKey } from './types';

type SupabaseServerClient = Awaited<ReturnType<typeof createSupabaseServer>>;

async function assertCompanyOwner(supabase: SupabaseServerClient, companyId: string, userId: string) {
    const { data, error } = await supabase
        .from('companies')
        .select('id')
        .eq('id', companyId)
        .eq('user_id', userId)
        .maybeSingle();

    if (error) {
        throw new Error(`Error verifying company ownership: ${ error.message }`);
    }

    if (!data) {
        throw new Error('You do not have permission to manage promotions for this company.');
    }
}

async function assertPromotionOwner(supabase: SupabaseServerClient, promotionId: string, userId: string) {
    const { data: promotion, error: promotionError } = await supabase
        .from('promotions')
        .select('company_id')
        .eq('id', promotionId)
        .single();

    if (promotionError) {
        throw new Error(`Error loading promotion: ${ promotionError.message }`);
    }

    await assertCompanyOwner(supabase, promotion.company_id, userId);
}

function buildPromotionFromFormData(formData: FormData) {
    const promotion: Partial<Record<PromotionFieldKey, string | number>> = {};

    for (const [ key, value ] of formData.entries()) {
        if (!value || typeof value !== 'string') {
            continue;
        }

        if (key === 'discount') {
            const discount = Number(value);

            if (Number.isNaN(discount)) {
                throw new Error(`Invalid discount value: "${ value }".`);
            }

            promotion.discount = discount;
        } else {
            promotion[ key as PromotionFieldKey ] = value;
        }
    }

    return promotion;
}

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

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        throw new Error(`Authentication failed: ${ userError.message }`);
    }

    if (!user) {
        redirect(pagesAuthLoginUrl());
    }

    await assertCompanyOwner(supabase, companyId, user.id);

    const newPromotion = buildPromotionFromFormData(formData);

    newPromotion.company_id = companyId;

    const { error } = await supabase
        .from('promotions')
        .insert( newPromotion as PromotionInsertSchema);

    if (error) {
        throw new Error(`Error creating promotion: ${ error.message }`);
    }
    
    redirect(pagesCompanyUrl(companyId));
}

export async function updatePromotion(id: string, formData: FormData) {
    const supabase = await createSupabaseServer();

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        throw new Error(`Authentication failed: ${ userError.message }`);
    }

    if (!user) {
        redirect(pagesAuthLoginUrl());
    }

    await assertPromotionOwner(supabase, id, user.id);

    const newPromotion = buildPromotionFromFormData(formData);

    const { error } = await supabase
        .from('promotions')
        .update(newPromotion as PromotionInsertSchema)
        .eq('id', id);

    if (error) {
        throw new Error(`Error updating promotion: ${ error.message }`);
    }
    
    redirect(pagesPromotionUrl(id));
}

export async function deletePromotion(id: string) {
    const supabase = await createSupabaseServer();

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        throw new Error(`Authentication failed: ${ userError.message }`);
    }

    if (!user) {
        redirect(pagesAuthLoginUrl());
    }

    await assertPromotionOwner(supabase, id, user.id);

    const { error } = await supabase
        .from('promotions')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/admin');
}