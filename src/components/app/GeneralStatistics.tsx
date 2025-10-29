import { getGeneralStatistics } from '@/app/admin/dashboard/actions';

import GeneralStatisticsCard from '../ui/cards/GeneralStatisticsCard';

export default async function GeneralStatistics() {
    const statistics = await getGeneralStatistics();

    return (
        <>
            {
                statistics.length
                    ? <ul className="c-general-statistics">
                        {
                            statistics.map(
                                (item, i) => (
                                    <GeneralStatisticsCard
                                        key={ i }
                                        statistics={ item }
                                    />
                                )
                            )
                        }
                    </ul>
                    : <div className="border border-gray-300 rounded flex-center size-full">
                        <p className="text-5xl">General statistics not found</p>
                    </div>
            }
        </>
    );
}