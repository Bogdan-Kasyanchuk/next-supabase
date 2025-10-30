'use client';

import { useDebouncedCallback } from '@mantine/hooks';
import { Search as SearchIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import cn from '@/utils/cn';

type Props = {
    placeholder?: string,
    disabled?: boolean
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

        params.delete('page');
        
        replace(`${ pathname }?${ params.toString() }`);
    }, 250);

    return (
        <div
            className={
                cn('c-toolbar__search', {
                    'c-toolbar__search--disabled': props.disabled
                })
            }
        >
            <input
                type="text"
                defaultValue={ searchParams.get('query')?.toString() }
                placeholder={ props.placeholder || 'Search' }
                className="c-toolbar__search-input"
                disabled={ props.disabled }
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
