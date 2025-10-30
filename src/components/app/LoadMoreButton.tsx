'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

import Button from '../ui/buttons/Button';

type Props = {
    page: number,
    totalPages: number
};

export default function LoadMoreButton(props: Props) {
    const [ isPending, startTransition ] = useTransition();
        
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handlePageChange = (nextPage: number) => {
        const params = new URLSearchParams(searchParams);

        params.set('page', String(nextPage));
        
        startTransition(() => {
            replace(`${ pathname }?${ params.toString() }`);
        });
    };
    
    return (
        <div className="text-center mt-5">
            <Button
                type="submit"
                disabled={ props.page >= props.totalPages || isPending }
                loading={ isPending }
                onClick={
                    () => {
                        handlePageChange(props.page + 1);
                    } 
                }
            >
                Load More
            </Button>
        </div>
    );
}
