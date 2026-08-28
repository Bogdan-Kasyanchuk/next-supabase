'use server';

import { ProfileRoleType } from '@/enums';
import { updateUserRole } from '@/services/admin/usersApi';

export async function updateUserRoleAction(userId: string, role: ProfileRoleType) {
    return await updateUserRole(userId, role);
}
