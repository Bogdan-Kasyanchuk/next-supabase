import { CompanyStatusType } from '@/enums';
import { SelectOption } from '@/types';

export const CONSTANTS = {
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!,
    GOOGLE_MAPS_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
    AVATAR_URL: 'https://ui-avatars.com/api',
    LOCALE: {
        region: 'UA',
        code: 'en'
    },
    ZONE: 'Europe/Kyiv'
};

export const statuses: SelectOption<CompanyStatusType>[] = [
    {
        label: 'Active',
        value: CompanyStatusType.ACTIVE
    },
    {
        label: 'Not active',
        value: CompanyStatusType.NOT_ACTIVE
    },
    {
        label: 'Pending',
        value: CompanyStatusType.PENDING
    },
    {
        label: 'Suspended',
        value: CompanyStatusType.SUSPENDED
    }
];

export const generalStatisticsLabel = {
    companies: 'Companies',
    promotions: 'Promotions',
    categories: 'Categories',
    newCompanies: 'New companies',
    activeCompanies: 'Active companies'
};
