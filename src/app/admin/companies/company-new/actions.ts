'use server';

import { revalidatePath } from 'next/cache';

import { CompanyStatusType } from '@/enums';
import createSupabaseServerClient from '@/lib/supabase/server';

export async function createCompany() {
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase
        .from('companies').insert({
            category: {
                label: 'Trade',
                value: 'trade'
            },
            country: {
                label: 'Italy',
                value: 'ita'
            },
            description: '5tertert',
            has_promotions: false,
            income: 1111,
            joined_at: '2025-10-14 13:21:38.220265+00',
            logo_url: 'https://picsum.photos/seed/R9Rhy/3345/3121?blur=2',
            name: 'Name---01',
            sold: 2222,
            status: CompanyStatusType.ACTIVE,
            user_id: '260380a0-4015-4ca8-959f-4be52eda2872'
        });

    if (error) {
        throw new Error('Error create company:', error);
    }
    
    revalidatePath('/admin');
}