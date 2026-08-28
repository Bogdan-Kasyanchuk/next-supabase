import { Metadata } from 'next';

import PromotionsList from '@/components/app/PromotionsList';
import Toolbar from '@/components/app/Toolbar';
import DataNotFound from '@/components/ui/data-display/DataNotFound';
import { isCurrentUserAdmin } from '@/services/admin/permissions';
import { getPromotions } from '@/services/admin/promotionsApi';

export const metadata: Metadata = {
    title: 'Promotions'
};

type Props = {
    searchParams: Promise<{ query?: string }>
};

export default async function Page(props: Props) {
    const searchParams = await props.searchParams;

    const query = searchParams.query ?? '';

    const [ promotions, canManage ] = await Promise.all([ getPromotions(query), isCurrentUserAdmin() ]);

    return (
        <div className="p-promotions flex flex-col w-full">
            <Toolbar
                searchProps={
                    {
                        placeholder: 'Search promotion'
                    }
                }
                hasSearch
            />

            <div className="p-5 grow overflow-y-auto">
                {
                    promotions.length
                        ? <PromotionsList
                            promotions={ promotions }
                            canManage={ canManage }
                        />
                        : <DataNotFound />
                }
            </div>
        </div>
    );
}
