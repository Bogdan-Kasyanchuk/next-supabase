import { CompanySchema, ProfileSchema, PromotionSchema } from './schemas';

export type Align = 'start' | 'center' | 'end';

export type SelectOption<V extends string = string> = {
    label: string,
    value: V
};

export type StatisticsItem = {
    label: string,
    count: number | null
};

export type ProfileMapper = Omit<ProfileSchema, 'email' | 'id'>;

export type CompanyMapper = Omit<CompanySchema, 'description' | 'income' | 'sold' | 'user_id'>;

export type CompanyDetailsMapper = Omit<CompanySchema, 'id' | 'user_id'>;

export type PromotionMapper = Omit<PromotionSchema, 'company_id' | 'description'>;

export type PromotionDetailsMapper = Omit<PromotionSchema, 'id' | 'company_id'>;

export type StatisticsMapper = {
    general: StatisticsItem[],
    sales: Array<Pick<CompanySchema, 'id' | 'logo_url' | 'name' | 'sold' | 'income'>>,
    categories: StatisticsItem[],
    countries: Array<StatisticsItem & { lat: number, lng: number }>,
    promotions: Array<Pick<PromotionSchema, 'id' | 'name' | 'discount'> & {
        company: Pick<CompanySchema, 'id' | 'logo_url' | 'name'>
    }>
};