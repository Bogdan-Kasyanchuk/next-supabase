import { PropsWithChildren } from 'react';

import { BadgeStatusType } from '@/enums';
import cn from '@/lib/utils';

const typeClasses = {
    [ BadgeStatusType.SUCCESS ]: 'text-success bg-success/10',
    [ BadgeStatusType.DANGER ]: 'text-danger bg-danger/10',
    [ BadgeStatusType.WARNING ]: 'text-warning bg-warning/10',
    [ BadgeStatusType.INFO ]: 'text-info bg-info/10'
};

type Props = {
    type: BadgeStatusType
};

export default function Badge(props: PropsWithChildren<Props>) {
    return (
        <div
            className={
                cn(
                    'c-badge',
                    typeClasses[ props.type ]
                )
            }
        >
            <div className="c-badge__dot" />
            
            { props.children }
        </div>
    );
}
