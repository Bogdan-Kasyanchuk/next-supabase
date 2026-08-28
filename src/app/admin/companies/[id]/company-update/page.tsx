import { notFound } from 'next/navigation';

import CompanyForm from '@/components/app/CompanyForm';
import { getCompanyById } from '@/services/admin/companiesApi';
import { isCurrentUserAdmin } from '@/services/admin/permissions';

type Props = {
    params: Promise<{ id: string }>
};

export default async function Page(props: Props) {
    const params = await props.params;

    if (!await isCurrentUserAdmin()) {
        notFound();
    }

    const company = await getCompanyById(params.id);

    if (!company) {
        notFound();
    }

    return (
        <div className="flex flex-col w-full justify-center-safe overflow-y-auto">
            <div className="p-5 shadow-custom w-full mx-auto max-w-[768px]">
                <CompanyForm
                    mode="update"
                    id={ params.id }
                    initialValues={
                        {
                            category: company.category.value,
                            country: company.country.value,
                            status: company.status,
                            logo_url: company.logo_url,
                            name: company.name,
                            joined_at: company.joined_at,
                            income: company.income,
                            sold: company.sold,
                            description: company.description
                        }
                    }
                />
            </div>
        </div>
    );
}