import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

import { CONSTANTS } from '@/datasets/constants';
import { pagesAuthLoginUrl, pagesDashboardUrl } from '@/routes';
import { Database } from '@/shemas';

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request
    });

    const supabase = createServerClient<Database>(
        CONSTANTS.SUPABASE_URL,
        CONSTANTS.SUPABASE_KEY,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({
                        request
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                }
            }
        }
    );

    const { data } = await supabase.auth.getClaims();
    const user = data?.claims;

    const url = request.nextUrl.clone();

    if (!user && !request.nextUrl.pathname.startsWith('/auth')) {
        url.pathname = pagesAuthLoginUrl();

        return NextResponse.redirect(url);
    }

    if (user && request.nextUrl.pathname.startsWith('/auth')) {
        url.pathname = pagesDashboardUrl();

        return NextResponse.redirect(url);
    }

    return supabaseResponse;
}
