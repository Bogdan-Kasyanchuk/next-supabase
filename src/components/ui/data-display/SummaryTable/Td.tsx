import { PropsWithChildren } from 'react';

import { Align } from '@/types';

type Props = {
    align?: Align
};

export default function Td(props: PropsWithChildren<Props>) {
    return (
        <td
            style={
                {
                    textAlign: props.align || 'start'
                }
            }
        >
            { props.children }
        </td>
    );
}
