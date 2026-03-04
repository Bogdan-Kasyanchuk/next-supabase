import CategoryStatisticsCard from '@/components/ui/cards/CategoryStatisticsCard';
import DataNotFound from '@/components/ui/data-display/DataNotFound';
import { getCategoriesStatistics } from '@/services/dashboardApi';

export default async function CategoriesStatistics() {
    const statistics = await getCategoriesStatistics();

    return (
        <>
            {
                statistics.length
                    ? <ul className="c-categories-statistics">
                        {
                            statistics.map(
                                item => (
                                    <CategoryStatisticsCard
                                        key={ item.label }
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
