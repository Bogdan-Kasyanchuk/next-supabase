import { Metadata } from 'next';

import LoadMoreButton from '@/components/app/LoadMoreButton';
import PromotionsList from '@/components/app/PromotionsList';
import Toolbar from '@/components/app/Toolbar';
import DataNotFound from '@/components/ui/data-display/DataNotFound';

import { getPromotions } from './actions';

export const metadata: Metadata = {
    title: 'Promotions'
};

type Props = {
    searchParams: Promise<{
        query?: string,
        page?: string
    }>
};

export default async function Page(props: Props) {
    const searchParams = await props.searchParams;

    const query = searchParams.query ?? '';
    const page = Number(searchParams.page ?? 1);

    const limit = 20;

    const data = await getPromotions(page, limit, query);

    const totalPages = Math.ceil((data.count ?? 0) / limit);

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
                    data.promotions.length
                        ? <>
                            <PromotionsList promotions={ data.promotions } />
                            <LoadMoreButton
                                page={ page }
                                totalPages={ totalPages }
                            />
                        </>
                        : <DataNotFound />
                }
            </div>
        </div>
    );
}
