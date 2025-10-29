import { Metadata } from 'next';

import CompaniesTable from '@/components/app/CompaniesTable';
import Toolbar from '@/components/app/Toolbar';
import ActionButton from '@/components/app/Toolbar/components/ActionButton';
import DataNotFound from '@/components/ui/data-display/DataNotFound';
import { pagesCompanyNewUrl } from '@/routes';

import { getCompanies } from './actions';

export const metadata: Metadata = {
    title: 'Companies'
};

type Props = {
    searchParams: Promise<{ query?: string }>
};

export default async function Page(props: Props) {
    const params = await props.searchParams;
    const query = params.query || '';

    const companies = await getCompanies(query);

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
                    companies.length
                        ? <CompaniesTable companies={ companies } />
                        : <DataNotFound />
                }
            </div>
        </div>
    );
}
