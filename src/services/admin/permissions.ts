import { cache } from 'react';

import { ProfileRoleType } from '@/enums';
import createSupabaseServer from '@/lib/supabase/server';

type SupabaseServerClient = Awaited<ReturnType<typeof createSupabaseServer>>;

export async function getUserRole(supabase: SupabaseServerClient, userId: string) {
    const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

    if (error) {
        throw new Error(`Error loading profile role: ${ error.message }`);
    }

    return data.role;
}

export async function assertAdmin(supabase: SupabaseServerClient, userId: string) {
    const role = await getUserRole(supabase, userId);

    if (role !== ProfileRoleType.ADMIN && role !== ProfileRoleType.SUPERADMIN) {
        throw new Error('You do not have permission to perform this action.');
    }
}

export async function assertSuperAdmin(supabase: SupabaseServerClient, userId: string) {
    const role = await getUserRole(supabase, userId);

    if (role !== ProfileRoleType.SUPERADMIN) {
        throw new Error('You do not have permission to perform this action.');
    }
}

export const getCurrentUser = cache(
    async function getCurrentUser() {
        const supabase = await createSupabaseServer();

        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            return null;
        }

        return user;
    }
);

export const isCurrentUserAdmin = cache(
    async function isCurrentUserAdmin() {
        const user = await getCurrentUser();

        if (!user) {
            return false;
        }

        const supabase = await createSupabaseServer();
        const role = await getUserRole(supabase, user.id);

        return role === ProfileRoleType.ADMIN || role === ProfileRoleType.SUPERADMIN;
    }
);

export const isCurrentUserSuperAdmin = cache(
    async function isCurrentUserSuperAdmin() {
        const user = await getCurrentUser();

        if (!user) {
            return false;
        }

        const supabase = await createSupabaseServer();
        const role = await getUserRole(supabase, user.id);

        return role === ProfileRoleType.SUPERADMIN;
    }
);
