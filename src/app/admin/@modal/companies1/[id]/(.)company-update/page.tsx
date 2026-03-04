'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getCompanyById } from '@/app/admin/companies/[id]/actions';
import UpdateCompanyForm from '@/components/app/UpdateCompanyForm';
import Loader from '@/components/ui/data-display/Loader';
import Modal from '@/components/ui/data-display/Modal';
import { CompanyDetailsMapper } from '@/types';

export default function Page() {
    const router = useRouter();
    const params = useParams<{ id: string }>();

    const [ company, setCompany ] = useState<CompanyDetailsMapper>();

    useEffect(() => {
        async function getCompany() {
            const company = await getCompanyById(params.id);

            setCompany(company);
        }

        getCompany();
    }, [ params.id ]);

    return (
        <>
            {
                company
                    ? <Modal
                        title="Update company"
                        opened
                        onClose={
                            () => {
                                router.back(); 
                            } 
                        }
                    >

                        <UpdateCompanyForm
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
                    </Modal>
                    : <Loader />
            }
        </>
    );
}