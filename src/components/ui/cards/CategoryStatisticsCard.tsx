import { StatisticsItem } from '@/types';

type Props = {
    statistics: StatisticsItem
};

export default function CategoryStatisticsCard(props: Props) {
    return (
        <li className="c-category-statistics-card">
            <span className="c-category-statistics-card__label">
                { props.statistics.label }
            </span>

            <span className="c-category-statistics-card__count">
                { props.statistics.count }
            </span>
        </li>
    );
}
