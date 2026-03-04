// 'use client';

// import { useParams, useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';

// import UpdatePromotionForm from '@/components/app/UpdatePromotionForm';
// import Modal from '@/components/ui/data-display/Modal';
// import { getPromotionById } from '@/services/promotionsApi';
// import { PromotionDetailsMapper } from '@/types';

// export default function Page() {
//     const router = useRouter();
//     const params = useParams<{ id: string }>();

//     const [ promotion, setPromotion ] = useState<PromotionDetailsMapper | null>(null);

//     useEffect(() => {
//         async function getPromotion() {
//             const promotion = await getPromotionById(params.id);

//             setPromotion(promotion);
//         }

//         getPromotion();
//     }, [ params.id ]);

//     if (!promotion) {
//         return null;
//     }

//     return (
//         <Modal
//             title="Update promotion"
//             opened
//             onClose={
//                 () => {
//                     router.back(); 
//                 } 
//             }
//         >
//             <UpdatePromotionForm
//                 id={ params.id } 
//                 initialValues={
//                     {
//                         name: promotion.name,
//                         discount: promotion.discount,
//                         start_at: promotion.start_at,
//                         end_at: promotion.end_at,
//                         description: promotion.description,
//                         cover_url: promotion.cover_url
//                     }
//                 }
//             />
//         </Modal>
//     );
// }

export default function Page() {
    return null;
}
