import { CompanyShema, PromotionShema } from './shemas';

export type CompanyMapper = Omit<CompanyShema, 'description' | 'income' | 'sold' | 'user_id'>;

export type PromotionMapper = Omit<PromotionShema, 'company_id'>;