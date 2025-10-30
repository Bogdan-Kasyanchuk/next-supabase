'use server';

import { redirect } from 'next/navigation';

import createSupabaseServerClient from '@/lib/supabase/server';
import { pagesCompanyUrl } from '@/routes';
import { PromotionInsertShema } from '@/shemas';

type Key = keyof PromotionInsertShema;

export async function createPromotion(companyId: string, formData: FormData) {
    const supabase = await createSupabaseServerClient();

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
        // eslint-disable-next-line no-console
        console.error(`Error creating promotion: ${ error.message }`);

        return;
    }
    
    redirect(pagesCompanyUrl(companyId));
}