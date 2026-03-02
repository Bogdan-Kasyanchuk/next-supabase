import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

import { CONSTANTS } from '@/datasets/constants';
import { pagesAuthLoginUrl, pagesDashboardUrl } from '@/routes';
import { Database } from '@/shemas';

export async function updateSession(request: NextRequest) {
    const supabaseResponse = NextResponse.next();

    const supabase = createServerClient<Database>(
        CONSTANTS.SUPABASE_URL,
        CONSTANTS.SUPABASE_KEY,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                }
            }
        }
    );

    const { data: { user } } = await supabase.auth.getUser();

    const pathname = request.nextUrl.pathname;

    const isAuthRoute = pathname.startsWith('/auth');

    if (!user && !isAuthRoute) {
        return NextResponse.redirect(new URL(pagesAuthLoginUrl(), request.url));
    }

    if (user && isAuthRoute) {
        return NextResponse.redirect(new URL(pagesDashboardUrl(), request.url));
    }

    return supabaseResponse;
}
