import DashboardCard from '@/components/ui/cards/DashboardCard';
import DataNotFound from '@/components/ui/data-display/DataNotFound';
import { getCountriesStatistics } from '@/services/admin/dashboardApi';

import GoogleMap from './components/GoogleMap';

export default async function CountriesStatistics() {
    const statistics = await getCountriesStatistics();

    return (
        <>
            {
                statistics.length
                    ? <DashboardCard label="Countries of companies">
                        <div className="c-countries-statistics">
                            <div className="c-countries-statistics__countries">
                                <ul className="c-countries-statistics__countries-list">
                                    {
                                        statistics.map(
                                            (item, i) => (
                                                <li
                                                    key={ i }
                                                    className="c-countries-statistics__countries-item"
                                                >
                                                    { `${ item.label } - ${ item.count }` }
                                                </li>
                                            )
                                        )
                                    }
                                </ul>
                            </div>

                            <div className="c-countries-statistics__map">
                                <GoogleMap statistics={ statistics } />
                            </div>
                        </div>
                    </DashboardCard>
                    : <DataNotFound className="bg-gray-200 rounded" />
            }
        </>
    );
}
