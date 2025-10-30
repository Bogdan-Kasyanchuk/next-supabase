'use server';

import { redirect } from 'next/navigation';

import createSupabaseServerClient from '@/lib/supabase/server';
import { categories, countries } from '@/mock/data';
import { pagesCompanyUrl } from '@/routes';
import { CompanyInsertShema } from '@/shemas';

type Key = keyof CompanyInsertShema;

export async function updateCompany(id: string, formData: FormData) {
    const supabase = await createSupabaseServerClient();
   
    const newCompany: Partial<Record<Key, any>> = {};

    for (const [ key, value ] of formData.entries()) {
        if (!value) {
            continue;
        }

        if (key === 'country' || key === 'category') {
            const source = key === 'country' ? countries : categories;

            newCompany[ key ] = {
                label: source.find(i => i.value === value)!.label,
                value
            };
        } else {
            newCompany[ key as Key ] = value;
        }
    }
    
    const { error } = await supabase
        .from('companies')
        .update(newCompany as CompanyInsertShema)
        .eq('id', id);

    if (error) {
        // eslint-disable-next-line no-console
        console.error(`Error updating company: ${ error.message }`);

        return;
    }
    
    redirect(pagesCompanyUrl(id));
}