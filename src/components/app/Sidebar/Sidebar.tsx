import { isCurrentUserSuperAdmin } from '@/services/admin/permissions';

import Navigation from './components/Navigation';

export default async function Sidebar() {
    const canManageUsers = await isCurrentUserSuperAdmin();

    return (
        <aside className="c-sidebar">
            <Navigation canManageUsers={ canManageUsers } />
        </aside>
    );
}
