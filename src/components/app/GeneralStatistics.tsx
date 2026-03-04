import GeneralStatisticsCard from '@/components/ui/cards/GeneralStatisticsCard';
import DataNotFound from '@/components/ui/data-display/DataNotFound';
import { getGeneralStatistics } from '@/services/dashboardApi';

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
                    : <DataNotFound className="bg-gray-200 rounded" />
            }
        </>
    );
}