import Image from 'next/image';
import Link from 'next/link';

import DashboardCard from '@/components/ui/cards/DashboardCard';
import SummaryTable from '@/components/ui/data-display/SummaryTable';
import { pagesCompanyUrl } from '@/routes';
import { getTradeStatistics } from '@/services/dashboardApi';
import formatCurrency from '@/utils/formatCurrency';

export default async function TradeStatistics() {
    const statistics = await getTradeStatistics();

    return (
        <>
            {
                statistics.length
                    ? <DashboardCard label="Trade details">
                        <SummaryTable.Root
                            headers={
                                <>
                                    <SummaryTable.Th>Company</SummaryTable.Th>

                                    <SummaryTable.Th align="center">Sold</SummaryTable.Th>

                                    <SummaryTable.Th align="center">Income</SummaryTable.Th>
                                </>
                            }
                        >
                            {
                                statistics.map(
                                    (item, i) => (
                                        <tr key={ i }>
                                            <SummaryTable.Td>
                                                <Link href={ pagesCompanyUrl( item.id ) }>
                                                    <div className="flex items-center gap-2">
                                                        <Image
                                                            width={ 20 }
                                                            height={ 20 }
                                                            src={ item.logo_url }
                                                            alt={ item.name }
                                                            className="rounded-full w-5 h-5"
                                                        />
                                                        
                                                        { item.name }
                                                    </div>
                                                </Link>
                                            </SummaryTable.Td>

                                            <SummaryTable.Td align="center">
                                                {
                                                    item.sold
                                                        ? `$${ formatCurrency(item.sold) }`
                                                        : '-'
                                                }
                                            </SummaryTable.Td>

                                            <SummaryTable.Td align="center">
                                                {
                                                    item.income
                                                        ? `$${ formatCurrency(item.income) }`
                                                        : '-'
                                                }
                                            </SummaryTable.Td>
                                        </tr>
                                    )
                                )
                            }
                        </SummaryTable.Root>
                    </DashboardCard>
                    : <div className="border border-gray-300 rounded flex-center size-full">
                        <p className="text-5xl">Trade statistics not found</p>
                    </div>
            }
        </>
    );
}