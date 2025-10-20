// 'use client';

// import { useRouter, useParams } from 'next/navigation';

// import { actionCreatePromotion } from '@/lib/actions';
// import Modal from '@/ui/modal';
// import PromotionForm from '@/ui/promotion-form';

// export default function Page() {
//     const router = useRouter();
//     const { id } = useParams<{ id: string }>();

//     const createPromotionWithCompanyId = actionCreatePromotion.bind(null, id);

//     return (
//         <Modal
//             show={true}
//             onClose={
//                 () => { router.back(); }
//             }
//         >
//             <PromotionForm
//                 title='Add new promotion'
//                 action={createPromotionWithCompanyId}
//             />
//         </Modal>
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
            <div className="font-bold text-10xl bg-amber-200 h-20">Promotion New</div>
        </Modal>
    );
}