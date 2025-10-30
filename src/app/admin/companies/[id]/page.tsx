import { Metadata } from 'next';
import { Suspense } from 'react';

import Toolbar from '@/components/app/Toolbar';
import ActionButton from '@/components/app/Toolbar/components/ActionButton';
import CompanyDetailsCard from '@/components/ui/cards/CompanyDetailsCard';
import DataNotFound from '@/components/ui/data-display/DataNotFound';
import Loader from '@/components/ui/data-display/Loader';
import { pagesCompanyUpdateUrl, pagesPromotionNewUrl } from '@/routes';

import { getCompanyById } from './actions';
import CompanyPromotions from '../../../../components/app/CompanyPromotions';

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;

    const company = await getCompanyById(params.id);

    return {
        title: company.name
    };
}

type Props = {
    params: Promise<{ id: string }>,
    searchParams: Promise<{ query?: string }>
};

export default async function Page(props: Props) {
    const params = await props.params;
    const searchParams = await props.searchParams;

    const query = searchParams.query ?? '';

    const company = await getCompanyById(params.id);

    return (
        <div className="p-company flex flex-col w-full">
            <Toolbar
                searchProps={
                    {
                        placeholder: 'Search promotion',
                        disabled: !company.has_promotions
                    }
                }
                actions={
                    <>
                        <ActionButton
                            rout={ pagesCompanyUpdateUrl(params.id) }
                            label="Update company"
                        />
                        <ActionButton
                            rout={ pagesPromotionNewUrl(params.id) }
                            label="Add promotion"
                        />
                    </>
                }
                hasSearch
            />

            <div className="p-5 grow overflow-y-auto flex">
                <CompanyDetailsCard company={ company } />

                <div className="ms-5 overflow-y-auto relative grow shrink-0">
                    {
                        company.has_promotions
                            ? <Suspense fallback={ <Loader /> }>
                                <CompanyPromotions
                                    companyId={ params.id }
                                    query={ query }
                                />
                            </Suspense>
                            : <DataNotFound className="bg-gray-200 rounded" />
                    }
                </div>
            </div>
        </div>
    );
}