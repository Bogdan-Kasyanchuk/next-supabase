import { createBrowserClient } from '@supabase/ssr';

import { CONSTANTS } from '@/datasets/constants';
import { Database } from '@/shemas';

export default function createSupabaseClient() {
    return createBrowserClient<Database>(CONSTANTS.SUPABASE_URL, CONSTANTS.SUPABASE_KEY);
}
