import { PropsWithChildren } from 'react';

import cn from '@/utils/cn';

type Props = {
    size?: 'small' | 'medium' | 'large' | 'full',
    className?: string
};

export default function Container(props: PropsWithChildren<Props>) {
    return (
        <div
            className={
                cn([
                    'l-container',
                    {
                        [ `l-container--${ props.size }` ]: props.size
                    },
                    props.className
                ])
            }
        >
            { props.children }
        </div>
    );
}
