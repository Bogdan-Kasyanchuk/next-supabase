'use server';

import createSupabaseServerClient from '@/lib/supabase/server';
import { generalStatisticsLabel } from '@/mock/data';
import { StatisticsMapper } from '@/types';

export async function getGeneralStatistics() {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
        .from('general_statistics')
        .select('*')
        .single();

    if (error || !data) {
        // eslint-disable-next-line no-console
        console.error(`Error loading general statistics: ${ error.message }`);

        return [];
    }

    const statistics: StatisticsMapper['general'] = [
        {
            label: generalStatisticsLabel.totalCompanies,
            count: data.total_companies
        },
        {
            label: generalStatisticsLabel.totalPromotions,
            count: data.total_promotions
        },
        {
            label: generalStatisticsLabel.totalCategories,
            count: data.total_categories
        },
        {
            label: generalStatisticsLabel.newCompanies,
            count: data.new_companies
        },
        {
            label: generalStatisticsLabel.totalActiveCompanies,
            count: data.total_active_companies
        }
    ];

    return statistics;
}

export async function getTradeStatistics() {
    const supabase = await createSupabaseServerClient();
    
    const { data, error } = await supabase
        .from('companies')
        .select( 'id, name, logo_url, sold, income');

    if (error || !data) {
        // eslint-disable-next-line no-console
        console.error(`Error loading trade statistics: ${ error.message }`);

        return [];
    }

    return data as StatisticsMapper['sales'];
}

export async function getCategoriesStatistics() {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
        .from('companies_by_category')
        .select('*');

    if (error || !data) {
        // eslint-disable-next-line no-console
        console.error(`Error loading categories statistics: ${ error.message }`);

        return [];
    }

    return data as StatisticsMapper['categories'];
}

export async function getCountriesStatistics() {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
        .from('companies_by_country')
        .select('*');

    if (error || !data) {
        // eslint-disable-next-line no-console
        console.error(`Error loading countries statistics: ${ error.message }`);

        return [];
    }

    return data as StatisticsMapper['countries'];
}

export async function getPromotionsStatistics() {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
        .from('promotions')
        .select('id, name, discount, company:companies (id, name, logo_url)');

    if (error || !data) {
        // eslint-disable-next-line no-console
        console.error(`Error loading promotions statistics: ${ error.message }`);

        return [];
    }

    return data as StatisticsMapper['promotions'];
}