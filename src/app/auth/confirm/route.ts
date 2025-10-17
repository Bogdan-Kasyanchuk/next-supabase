import { type EmailOtpType } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';

import createSupabaseServerClient from '@/lib/supabase/server';
import { pagesAuthErrorUrl } from '@/routes';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const token_hash = searchParams.get('token_hash');
    const type = searchParams.get('type') as EmailOtpType | null;
    const next = searchParams.get('next') ?? '/';

    if (!token_hash || !type) {
        return redirect(
            `${ pagesAuthErrorUrl() }?error=No token hash or type`
        );
    }

    const supabase = await createSupabaseServerClient();

    const { error } = await supabase.auth.verifyOtp({
        type,
        token_hash
    });

    if (!error) {
        redirect(next);
    } 

    redirect(`${ pagesAuthErrorUrl() }?error=${ error.message }`);
}
