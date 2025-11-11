import { Metadata } from 'next';
import { Suspense } from 'react';

import CategoriesStatistics from '@/components/app/CategoriesStatistics';
import CountriesStatistics from '@/components/app/CountriesStatistics';
import GeneralStatistics from '@/components/app/GeneralStatistics';
import PromotionsStatistics from '@/components/app/PromotionsStatistics';
import TradeStatistics from '@/components/app/TradeStatistics';
import Loader from '@/components/ui/data-display/Loader';

export const metadata: Metadata = {
    title: 'Dashboard'
};

export default function Page() {
    return (
        <div className="flex flex-col gap-5 w-full overflow-y-auto p-5">
            <div className="relative">
                <Suspense fallback={ <Loader /> }>
                    <GeneralStatistics />
                </Suspense>
            </div>

            <div className="flex flex-col gap-5 lg:flex-row">
                <div className="max-h-[398px] grow relative">
                    <Suspense fallback={ <Loader /> }>
                        <PromotionsStatistics />
                    </Suspense>
                </div>

                <div className="relative">
                    <Suspense fallback={ <Loader /> }>
                        <CategoriesStatistics />
                    </Suspense>
                </div>
            </div>

            <div className="flex flex-col gap-5 xl:flex-row">
                <div className="xl:w-1/2 relative">
                    <Suspense fallback={ <Loader /> }>
                        <CountriesStatistics />
                    </Suspense>
                </div>

                <div className="max-h-[398px] grow relative">
                    <Suspense fallback={ <Loader /> }>
                        <TradeStatistics />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
