import { Metadata } from 'next';

import CompaniesTable from '@/components/app/CompaniesTable';
import Toolbar from '@/components/app/Toolbar';
import ActionButton from '@/components/app/Toolbar/components/ActionButton';
import DataNotFound from '@/components/ui/data-display/DataNotFound';
import { pagesCompanyNewUrl } from '@/routes';
import { getCompanies } from '@/services/companiesApi';

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

    const data = await getCompanies(query);

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
                        ? <CompaniesTable companies={ data.companies } />
                        : <DataNotFound />
                }
            </div>
        </div>
    );
}
