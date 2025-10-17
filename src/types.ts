import { CompanyShema, ProfileShema, PromotionShema } from './shemas';

export type ProfileMapper = Omit<ProfileShema, 'email' | 'id'>;

export type CompanyMapper = Omit<CompanyShema, 'description' | 'income' | 'sold' | 'user_id'>;

export type CompanyDetailsMapper = CompanyShema;

export type PromotionMapper = Omit<PromotionShema, 'company_id' | 'description'>;

export type PromotionDetailsMapper = PromotionShema;