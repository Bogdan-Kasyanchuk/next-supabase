import { MergeDeep } from 'type-fest';

import { Database as DatabaseGenerated } from './db-types';
import { CompanyStatusType } from './enums';

export type CompanyShema = {
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

export type PromotionShema = {
    company_id: string,
    cover_url: string,
    start_at: string,
    end_at: string,
    description: string,
    discount: number,
    id: string,
    name: string
};

export type ProfileShema = {
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
                  Row: CompanyShema
              },
              profiles: {
                  Row: ProfileShema
              },
              promotions: {
                  Row: PromotionShema
              }
          }
      }
  }
>;