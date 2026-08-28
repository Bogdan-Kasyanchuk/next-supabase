import { notFound } from 'next/navigation';

import PromotionForm from '@/components/app/PromotionForm';
import { isCurrentUserAdmin } from '@/services/admin/permissions';

type Props = {
    params: Promise<{ id: string }>
};

export default async function Page(props: Props) {
    const params = await props.params;

    if (!await isCurrentUserAdmin()) {
        notFound();
    }

    return (
        <div className="flex flex-col w-full justify-center-safe overflow-y-auto">
            <div className="p-5 shadow-custom w-full mx-auto max-w-[768px]">
                <PromotionForm
                    mode="create"
                    companyId={ params.id }
                />
            </div>
        </div>
    );
}