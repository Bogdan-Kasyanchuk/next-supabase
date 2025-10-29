'use server';

import { redirect } from 'next/navigation';

import createSupabaseServerClient from '@/lib/supabase/server';
import { pagesPromotionUrl } from '@/routes';
import { PromotionInsertShema } from '@/shemas';

type Key = keyof PromotionInsertShema;

export async function updatePromotion(id: string, formData: FormData) {
    const supabase = await createSupabaseServerClient();

    const newPromotion: Partial<Record<Key, any>> = {};

    for (const [ key, value ] of formData.entries()) {
        if (!value) {
            continue;
        }

        newPromotion[ key as Key ] = value;
    }

    const { error } = await supabase.from('promotions').update(
        newPromotion as PromotionInsertShema
    ).eq('id', id);

    if (error) {
        // eslint-disable-next-line no-console
        console.error(`Error updating promotion: ${ error.message }`);

        return;
    }
    
    redirect(pagesPromotionUrl(id));
}