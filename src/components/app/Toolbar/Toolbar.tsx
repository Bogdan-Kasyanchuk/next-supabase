import { ReactNode } from 'react';

import cn from '@/utils/cn';

import Search from './components/Search';

type Props = {
    actions?: ReactNode,
    className?: string,
    searchProps?: {
        placeholder?: string,
        disabled?: boolean

    },
    hasSearch?: boolean
};

export default function Toolbar(props: Props) {
    return (
        <div className={ cn('c-toolbar', props.className) }>
            {
                props.hasSearch &&
                <Search { ...props.searchProps } />
            }

            {
                props.actions &&
                <div className="c-toolbar__actions">
                    { props.actions }
                </div>
            }
        </div>
    );
}
