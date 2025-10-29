import { PropsWithChildren } from 'react';

import { Align } from '@/types';

type Props = {
    align?: Align
};

export default function Th(props: PropsWithChildren<Props>) {
    return (
        <th
            style={
                {
                    textAlign: props.align || 'start'
                }
            }
        >
            { props.children }
        </th>
    );
}
