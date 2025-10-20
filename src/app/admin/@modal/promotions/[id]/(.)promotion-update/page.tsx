// 'use client';

// import { useRouter, useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';

// import { actionUpdatePromotion } from '@/lib/actions';
// import { fetchPromotion } from '@/lib/data';
// import { PromotionMapper } from '@/types';
// import Loader from '@/ui/loader/loader';
// import Modal from '@/ui/modal';
// import PromotionForm from '@/ui/promotion-form';

// export default function Page() {
//     const router = useRouter();
//     const { id } = useParams<{ id: string }>();

//     const [promotion, setPromotion] = useState<PromotionMapper>();

//     useEffect(() => {
//         async function getPromotion() {
//             const promotion = await fetchPromotion(id);

//             if (!promotion) {
//                 console.log('Promotion not found');

//                 return;
//             }

//             setPromotion(promotion);
//         }

//         getPromotion();
//     }, [id]);

//     const actionUpdatePromotionWithId = actionUpdatePromotion.bind(null, id);

//     return (
//         <>
//             {
//                 promotion
//                     ? <Modal
//                         show={true}
//                         onClose={
//                             () => { router.back(); }
//                         }
//                     >

//                         <PromotionForm
//                             title='Update promotion'
//                             action={actionUpdatePromotionWithId}
//                             initialValues={
//                                 {
//                                     title: promotion.title,
//                                     discount: promotion.discount,
//                                     description: promotion.description
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
            <div className="font-bold text-10xl bg-amber-200 h-20">Promotion Update</div>
        </Modal>
    );
}