import Image from 'next/image';
import Link from 'next/link';

import { getPromotionsStatistics } from '@/app/admin/dashboard/actions';
import { pagesCompanyUrl, pagesPromotionUrl } from '@/routes';

import DashboardCard from '../ui/cards/DashboardCard';
import SummaryTable from '../ui/data-display/SummaryTable';

export default async function PromotionsStatistics() {
    const statistics = await getPromotionsStatistics();

    return (
        <>
            {
                statistics.length
                    ? <DashboardCard label="Promotions">
                        <SummaryTable.Root
                            headers={
                                <>
                                    <SummaryTable.Th>Company</SummaryTable.Th>

                                    <SummaryTable.Th>Name</SummaryTable.Th>

                                    <SummaryTable.Th align="center">%</SummaryTable.Th>
                                </>
                            }
                        >
                            {
                                statistics.map(
                                    (item, i) => (
                                        <tr key={ i }>
                                            <SummaryTable.Td>
                                                <Link href={ pagesCompanyUrl( item.company.id ) }>
                                                    <div className="flex items-center gap-2">
                                                        <Image
                                                            width={ 20 }
                                                            height={ 20 }
                                                            src={ item.company.logo_url }
                                                            alt={ item.company.name }
                                                            className="rounded-full w-5 h-5"
                                                        />
                                                        
                                                        { item.company.name }
                                                    </div>
                                                </Link>
                                            </SummaryTable.Td>

                                            <SummaryTable.Td>
                                                <Link href={ pagesPromotionUrl( item.id ) }>
                                                    { item.name }
                                                </Link>
                                            </SummaryTable.Td>

                                            <SummaryTable.Td align="center">
                                                { `-${ item.discount }%` }
                                            </SummaryTable.Td>
                                        </tr>
                                    )
                                )
                            }
                        </SummaryTable.Root>
                    </DashboardCard>
                    : <div className="border border-gray-300 rounded flex-center size-full">
                        <p className="text-5xl">Promotions statistics not found</p>
                    </div>
            }
        </>
    );
}