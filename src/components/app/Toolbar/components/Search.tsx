'use client';

import { useDebouncedCallback } from '@mantine/hooks';
import { Search as SearchIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
    placeholder: string
};

export default function Search(props: Props) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback(term => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${ pathname }?${ params.toString() }`);
    }, 300);

    return (
        <div className="c-toolbar__search">
            <input
                type="text"
                defaultValue={ searchParams.get('query')?.toString() }
                placeholder={ props.placeholder }
                className="c-toolbar__search-input"
                onChange={
                    e => {
                        handleSearch(e.target.value);
                    }
                }
            />
            
            <div className="c-toolbar__search-icon">
                <SearchIcon
                    size={ 20 }
                    aria-label="Search"
                />
            </div>
        </div>
    );
}
