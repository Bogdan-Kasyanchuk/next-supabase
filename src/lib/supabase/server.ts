import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { CONSTANTS } from '@/datasets/constants';
import { Database } from '@/shemas';

/**
 * Especially important if using Fluid compute: Don't put this client in a
 * global variable. Always create a new client within each function when using
 * it.
 */
export default async function createSupabaseServerClient() {
    const cookieStore = await cookies();

    return createServerClient<Database>(
        CONSTANTS.SUPABASE_URL,
        CONSTANTS.SUPABASE_KEY,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                }
            }
        }
    );
}
