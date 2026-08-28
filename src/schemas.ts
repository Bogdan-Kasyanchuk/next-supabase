import { MergeDeep } from 'type-fest';

import { Database as DatabaseGenerated } from './db-types';
import { CompanyStatusType } from './enums';

export type CompanyInsertSchema = {
    category: {
        label: string,
        value: string
    },
    country: {
        label: string,
        value: string
    },
    description?: string,
    has_promotions?: boolean,
    income?: number,
    joined_at?: string,
    logo_url: string,
    name: string,
    sold?: number,
    status: string,
    user_id: string
};

export type CompanySchema = {
    category: {
        label: string,
        value: string
    },
    country: {
        label: string,
        value: string
    },
    description: string | null,
    has_promotions: boolean,
    id: string,
    income: number | null,
    joined_at: string,
    logo_url: string,
    name: string,
    sold: number | null,
    status: CompanyStatusType,
    user_id: string
};

export type PromotionInsertSchema = {
    company_id: string,
    cover_url: string,
    description: string,
    discount: number,
    end_at: string,
    name: string,
    start_at?: string
};

export type PromotionSchema = {
    company_id: string,
    cover_url: string,
    start_at: string,
    end_at: string,
    description: string,
    discount: number,
    id: string,
    name: string
};

export type ProfileSchema = {
    avatar_url: string,
    email: string,
    first_name: string,
    id: string,
    last_name: string | null
};

export type Database = MergeDeep<
  DatabaseGenerated,
  {
      public: {
          Tables: {
              companies: {
                  Insert: CompanyInsertSchema,
                  Row: CompanySchema
              },
              profiles: {
                  Row: ProfileSchema
              },
              promotions: {
                  Row: PromotionSchema
              }
          }
      }
  }
>;