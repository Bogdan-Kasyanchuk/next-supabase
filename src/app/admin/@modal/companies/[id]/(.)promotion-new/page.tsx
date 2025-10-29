'use client';

import { useParams, useRouter } from 'next/navigation';

import CreatePromotionForm from '@/components/app/CreatePromotionForm';
import Modal from '@/components/ui/data-display/Modal';

export default function Page() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    
    return (
        <Modal
            title="Create promotion"
            opened
            onClose={
                () => {
                    router.back(); 
                } 
            }
        >
            <CreatePromotionForm companyId={ params.id } />
        </Modal>
    );
}