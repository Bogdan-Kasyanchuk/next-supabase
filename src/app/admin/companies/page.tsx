import { Metadata } from 'next';

import CompaniesTable from '@/components/app/CompaniesTable';
import LoadMoreButton from '@/components/app/LoadMoreButton';
import Toolbar from '@/components/app/Toolbar';
import ActionButton from '@/components/app/Toolbar/components/ActionButton';
import DataNotFound from '@/components/ui/data-display/DataNotFound';
import { pagesCompanyNewUrl } from '@/routes';

import { getCompanies } from './actions';

export const metadata: Metadata = {
    title: 'Companies'
};

type Props = {
    searchParams: Promise<{
        query?: string,
        page?: string
    }>
};

export default async function Page(props: Props) {
    const searchParams = await props.searchParams;

    const query = searchParams.query ?? '';
    const page = Number(searchParams.page ?? 1);

    const limit = 15;

    const data = await getCompanies(page, limit, query);

    const totalPages = Math.ceil((data.count ?? 0) / limit);

    return (
        <div className="flex flex-col w-full">
            <Toolbar
                searchProps={
                    {
                        placeholder: 'Search company'
                    }
                }
                actions={
                    <ActionButton
                        rout={ pagesCompanyNewUrl() }
                        label="Add company"
                    />
                }
                hasSearch
            />

            <div className="p-5 grow overflow-auto">
                {
                    data.companies.length
                        ? <>
                            <CompaniesTable companies={ data.companies } />
                            <LoadMoreButton
                                page={ page }
                                totalPages={ totalPages }
                            />
                        </>
                        : <DataNotFound />
                }
            </div>
        </div>
    );
}
