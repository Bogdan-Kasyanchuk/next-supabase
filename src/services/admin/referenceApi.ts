import { cache } from 'react';

import createSupabaseServer from '@/lib/supabase/server';
import { SelectOption } from '@/types';

export const getCategories = cache(
    async function getCategories() {
        const supabase = await createSupabaseServer();

        const { data, error } = await supabase
            .from('categories')
            .select('label, value')
            .order('label', { ascending: true });

        if (error) {
            throw new Error(`Error loading categories: ${ error.message }`);
        }

        return (data ?? []) as SelectOption[];
    }
);

export const getCountries = cache(
    async function getCountries() {
        const supabase = await createSupabaseServer();

        const { data, error } = await supabase
            .from('countries')
            .select('label, value')
            .order('label', { ascending: true });

        if (error) {
            throw new Error(`Error loading countries: ${ error.message }`);
        }

        return (data ?? []) as SelectOption[];
    }
);
