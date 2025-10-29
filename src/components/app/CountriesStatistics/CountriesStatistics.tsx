import { getCountriesStatistics } from '@/app/admin/dashboard/actions';

import GoogleMap from './components/GoogleMap';
import DashboardCard from '../../ui/cards/DashboardCard';

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
                    : <div className="border border-gray-300 rounded flex-center size-full">
                        <p className="text-5xl">Countries statistics not found</p>
                    </div>
            }
        </>
    );
}
