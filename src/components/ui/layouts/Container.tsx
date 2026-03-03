import clsx from 'clsx';
import { PropsWithChildren } from 'react';

type Props = {
    className?: string,
    full?: boolean
};

export default function Container(props: PropsWithChildren<Props>) {
    return (
        <div
            className={
                clsx([
                    'l-container',
                    {
                        'l-container--full': props.full
                    },
                    props.className
                ])
            }
        >
            { props.children }
        </div>
    );
}
