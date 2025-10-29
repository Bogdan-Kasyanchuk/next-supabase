import { PropsWithChildren, ReactNode } from 'react';

type Props = {
    label: ReactNode
};

export default function DashboardCard(props: PropsWithChildren<Props>) {
    return (
        <div className="c-dashboard-card">
            <p className="c-dashboard-card__title">{ props.label }</p>
            <div className="c-dashboard-card__content">{ props.children }</div>
        </div>
    );
}
