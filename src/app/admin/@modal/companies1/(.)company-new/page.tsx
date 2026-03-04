'use client';

import { useRouter } from 'next/navigation';

import CreateCompanyForm from '@/components/app/CreateCompanyForm';
import Modal from '@/components/ui/data-display/Modal';

export default function Page() {
    const router = useRouter();
    
    return (
        <Modal
            title="Create company"
            opened
            onClose={
                () => {
                    router.back(); 
                } 
            }
        >
            <CreateCompanyForm />
        </Modal>
    );
}