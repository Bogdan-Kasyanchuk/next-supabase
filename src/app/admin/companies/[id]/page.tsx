import { Metadata } from 'next';
import { Suspense } from 'react';

import Toolbar from '@/components/app/Toolbar';
import ActionButton from '@/components/app/Toolbar/components/ActionButton';
import CompanyDetailsCard from '@/components/ui/cards/CompanyDetailsCard';
import Loader from '@/components/ui/data-display/Loader';
import { pagesCompanyUpdateUrl, pagesPromotionNewUrl } from '@/routes';

import { getCompanyById } from './actions';
import CompanyPromotions from './components/CompanyPromotions';

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { id } = await props.params;

    return {
        title: id
    };
}

type Props = {
    params: Promise<{ id: string }>,
    searchParams: Promise<{ query?: string }>
};

export default async function Page(props: Props) {
    const { id } = await props.params;

    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';

    const company = await getCompanyById(id);

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
                            rout={ pagesCompanyUpdateUrl(id) }
                            label="Update company"
                        />
                        <ActionButton
                            rout={ pagesPromotionNewUrl(id) }
                            label="Add promotion"
                        />
                    </>
                }
                hasSearch
            />

            <div className="p-5 grow overflow-y-auto flex">
                <CompanyDetailsCard company={ company } />

                <div className="ms-5 overflow-y-auto relative grow shrink-0">
                    <Suspense fallback={ <Loader /> }>
                        <CompanyPromotions
                            companyId={ id }
                            query={ query }
                        />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}