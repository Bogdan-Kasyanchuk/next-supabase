import { createBrowserClient } from '@supabase/ssr';

import { PARAMETERS } from '@/helpers/parameters';
import { Database } from '@/shemas';

export default function createSupabaseBrowserClient() {
    return createBrowserClient<Database>(PARAMETERS.SUPABASE_URL, PARAMETERS.SUPABASE_KEY);
}
