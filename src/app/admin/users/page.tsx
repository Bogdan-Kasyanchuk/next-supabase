import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import UsersTable from '@/components/app/UsersTable';
import { pagesAuthLoginUrl } from '@/routes';
import { getCurrentUser, isCurrentUserSuperAdmin } from '@/services/admin/permissions';
import { getUsers } from '@/services/admin/usersApi';

export const metadata: Metadata = {
    title: 'Users'
};

export default async function Page() {
    const user = await getCurrentUser();

    if (!user) {
        redirect(pagesAuthLoginUrl());
    }

    if (!await isCurrentUserSuperAdmin()) {
        notFound();
    }

    const users = await getUsers();

    return (
        <div className="flex flex-col w-full">
            <div className="p-5 grow overflow-auto">
                <UsersTable
                    users={ users }
                    currentUserId={ user.id }
                />
            </div>
        </div>
    );
}
