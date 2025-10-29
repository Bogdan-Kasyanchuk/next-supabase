import { getCategoriesStatistics } from '@/app/admin/dashboard/actions';

import CategoryStatisticsCard from '../ui/cards/CategoryStatisticsCard';

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
                    : <div className="border border-gray-300 rounded flex-center size-full">
                        <p className="text-5xl">Categories statistics not found</p>
                    </div>
            }
        </>
    );
}
