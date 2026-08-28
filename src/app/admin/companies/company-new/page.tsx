import { notFound } from 'next/navigation';

import CompanyForm from '@/components/app/CompanyForm';
import { isCurrentUserAdmin } from '@/services/admin/permissions';

export default async function Page() {
    if (!await isCurrentUserAdmin()) {
        notFound();
    }

    return (
        <div className="flex flex-col w-full justify-center-safe overflow-y-auto">
            <div className="p-5 shadow-custom w-full mx-auto max-w-[768px]">
                <CompanyForm mode="create" />
            </div>
        </div>
    );
}