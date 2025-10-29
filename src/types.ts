import { CompanyShema, ProfileShema, PromotionShema } from './shemas';

export type Align = 'start' | 'center' | 'end';

export type SelectOption<V extends string = string> = {
    label: string,
    value: V
};

export type StatisticsItem = {
    label: string,
    count: number | null
};

export type ProfileMapper = Omit<ProfileShema, 'email' | 'id'>;

export type CompanyMapper = Omit<CompanyShema, 'description' | 'income' | 'sold' | 'user_id'>;

export type CompanyDetailsMapper = Omit<CompanyShema, 'id' | 'user_id'>;

export type PromotionMapper = Omit<PromotionShema, 'company_id' | 'description'>;

export type PromotionDetailsMapper = Omit<PromotionShema, 'id' | 'company_id'>;

export type StatisticsMapper = {
    general: StatisticsItem[],
    sales: Array<Pick<CompanyShema, 'id' | 'logo_url' | 'name' | 'sold' | 'income'>>,
    categories: StatisticsItem[],
    countries: Array<StatisticsItem & { lat: number, lng: number }>,
    promotions: Array<{
        id: PromotionShema['id'],
        name: PromotionShema['name'],
        discount: PromotionShema['discount'],
        company: Pick<CompanyShema, 'id' | 'logo_url' | 'name'>
    }>
};