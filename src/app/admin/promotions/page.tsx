import { Metadata } from 'next';

import PromotionsList from '@/components/app/PromotionsList';
import Toolbar from '@/components/app/Toolbar';
import DataNotFound from '@/components/ui/data-display/DataNotFound';

import { getPromotions } from './actions';

export const metadata: Metadata = {
    title: 'Promotions'
};

type Props = {
    searchParams: Promise<{ query?: string }>
};

export default async function Page(props: Props) {
    const params = await props.searchParams;
    const query = params?.query || '';

    const promotions = await getPromotions(query);

    return (
        <div className="w-full flex flex-col min-w-px">
            <Toolbar
                searchPlaceholder="Search promotion"
                hasSearch
            />

            <div className="p-5 grow overflow-auto">
                {
                    promotions?.length
                        ? <PromotionsList promotions={ promotions } />
                        : <DataNotFound />
                }
            </div>
        </div>
    );
}
