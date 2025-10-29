import { StatisticsItem } from '@/types';

type Props = {
    statistics: StatisticsItem
};

export default function GeneralStatisticsCard(props: Props) {
    return (
        <li className="c-general-statistics-card c-general-statistics-card--gradient">
            <span className="c-general-statistics-card__label">
                { props.statistics.label }
            </span>

            <span className="c-general-statistics-card__count">
                { props.statistics.count }
            </span>
        </li>
    );
}