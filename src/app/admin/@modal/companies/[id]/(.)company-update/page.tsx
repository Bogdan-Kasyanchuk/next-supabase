// 'use client';

// import { useRouter, useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';

// import { actionUpdateCompany } from '@/lib/actions';
// import { fetchCompany } from '@/lib/data';
// import { CompanyMapper } from '@/types';
// import CompanyForm from '@/ui/company-form';
// import Loader from '@/ui/loader/loader';
// import Modal from '@/ui/modal';

// export default function Page() {
//     const router = useRouter();
//     const { id } = useParams<{ id: string }>();

//     const [company, setCompany] = useState<CompanyMapper>();

//     useEffect(() => {
//         async function getCompany() {
//             const company = await fetchCompany(id);

//             if (!company) {
//                 console.log('Company not found');

//                 return;
//             }

//             setCompany(company);
//         }

//         getCompany();
//     }, [id]);

//     const actionUpdateCompanyWithId = actionUpdateCompany.bind(null, id);

//     return (
//         <>
//             {
//                 company
//                     ? <Modal
//                         show={true}
//                         onClose={
//                             () => { router.back(); }
//                         }
//                     >

//                         <CompanyForm
//                             title='Update company'
//                             action={actionUpdateCompanyWithId}
//                             initialValues={
//                                 {
//                                     status: company.status,
//                                     codeCountry: company.country.code,
//                                     title: company.title,
//                                     codeCategory: company.category.code,
//                                     joinedAt: new Date(company.joinedAt).toLocaleDateString('uk-UA').split('.').reverse().join('-'),
//                                     description: company.description
//                                 }
//                             }
//                         />
//                     </Modal>
//                     : <Loader className='absolute inset-0 z-10 bg-black/70' />
//             }
//         </>
//     );
// }

'use client';

import { useRouter } from 'next/navigation';

import Modal from '@/components/ui/data-display/Modal';

export default function Page() {
    const router = useRouter();
    
    return (
        <Modal
            opened
            onClose={
                () => {
                    router.back(); 
                } 
            }
            title="Update promotion"
        >
            <div className="font-bold text-10xl bg-amber-200 h-20">Company Update</div>
        </Modal>
    );
}