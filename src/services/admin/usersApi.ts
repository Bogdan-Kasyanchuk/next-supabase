import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { ProfileRoleType } from '@/enums';
import createSupabaseServer from '@/lib/supabase/server';
import { pagesAuthLoginUrl, pagesUsersUrl } from '@/routes';
import { UserMapper } from '@/types';

import { assertSuperAdmin } from './permissions';

export async function getUsers() {
    const supabase = await createSupabaseServer();

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        throw new Error(`Authentication failed: ${ userError.message }`);
    }

    if (!user) {
        redirect(pagesAuthLoginUrl());
    }

    await assertSuperAdmin(supabase, user.id);

    const { data, error } = await supabase
        .from('profiles')
        .select('id, avatar_url, email, first_name, last_name, role')
        .order('email', { ascending: true });

    if (error) {
        throw new Error(`Error loading users: ${ error.message }`);
    }

    return (data ?? []) as UserMapper[];
}

export async function updateUserRole(userId: string, role: ProfileRoleType) {
    const supabase = await createSupabaseServer();

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        throw new Error(`Authentication failed: ${ userError.message }`);
    }

    if (!user) {
        redirect(pagesAuthLoginUrl());
    }

    await assertSuperAdmin(supabase, user.id);

    if (userId === user.id) {
        throw new Error('You cannot change your own role.');
    }

    const { data, error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', userId)
        .select('id');

    if (error) {
        throw new Error(`Error updating user role: ${ error.message }`);
    }

    if (!data || data.length === 0) {
        throw new Error('User not found.');
    }

    revalidatePath(pagesUsersUrl());
}
