import { ReactNode } from 'react';

import Search from './components/Search';

type Props = {
    actions?: ReactNode,
    searchPlaceholder?: string,
    hasSearch: boolean
};

export default function Toolbar(props: Props) {
    return (
        <div className="c-toolbar">
            {
                props.hasSearch &&
                <Search placeholder={ props.searchPlaceholder || 'Search' } />
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
