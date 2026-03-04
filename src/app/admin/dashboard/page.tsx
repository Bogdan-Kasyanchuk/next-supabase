import { Metadata } from 'next';
import { Suspense } from 'react';

import CategoriesStatistics from '@/components/app/CategoriesStatistics';
import CountriesStatistics from '@/components/app/CountriesStatistics';
import CustomErrorBoundary from '@/components/app/CustomErrorBoundary';
import GeneralStatistics from '@/components/app/GeneralStatistics';
import PromotionsStatistics from '@/components/app/PromotionsStatistics';
import TradeStatistics from '@/components/app/TradeStatistics';
import Loader from '@/components/ui/data-display/Loader';

export const metadata: Metadata = {
    title: 'Dashboard'
};

export default function Page() {
    return (
        <div className="p-dashboard flex flex-col gap-5 w-full overflow-y-auto p-5">
            <div className="relative h-[370px] lg:h-[240px] xl:h-[110px] lg:min-h-fit shrink-0">
                <CustomErrorBoundary>
                    <Suspense fallback={ <Loader /> }>
                        <GeneralStatistics />
                    </Suspense>
                </CustomErrorBoundary>
            </div>

            <div className="flex flex-col gap-5 lg:flex-row">
                <div className="relative h-[398px] lg:min-h-fit grow">
                    <CustomErrorBoundary>
                        <Suspense fallback={ <Loader /> }>
                            <PromotionsStatistics />
                        </Suspense>
                    </CustomErrorBoundary>
                </div>

                <div className="relative h-[296px] lg:h-[398px] lg:min-h-fit lg:min-w-[255px] xl:min-w-[387px] shrink-0">
                    <CustomErrorBoundary>
                        <Suspense fallback={ <Loader /> }>
                            <CategoriesStatistics />
                        </Suspense>
                    </CustomErrorBoundary>
                </div>
            </div>

            <div className="flex flex-col gap-5 xl:flex-row">
                <div className="xl:w-1/2 relative h-[398px] xl:min-h-fit shrink-0">
                    <CustomErrorBoundary>
                        <Suspense fallback={ <Loader /> }>
                            <CountriesStatistics />
                        </Suspense>
                    </CustomErrorBoundary>
                </div>

                <div className="grow relative h-[398px] xl:min-h-fit">
                    <CustomErrorBoundary>
                        <Suspense fallback={ <Loader /> }>
                            <TradeStatistics />
                        </Suspense>
                    </CustomErrorBoundary>
                </div>
            </div>
        </div>
    );
}
