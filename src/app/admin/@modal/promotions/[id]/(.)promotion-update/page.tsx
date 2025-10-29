'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getPromotionById } from '@/app/admin/promotions/[id]/actions';
import UpdatePromotionForm from '@/components/app/UpdatePromotionForm';
import Loader from '@/components/ui/data-display/Loader';
import Modal from '@/components/ui/data-display/Modal';
import { PromotionDetailsMapper } from '@/types';

export default function Page() {
    const router = useRouter();
    const params = useParams<{ id: string }>();

    const [ promotion, setPromotion ] = useState<PromotionDetailsMapper>();

    useEffect(() => {
        async function getPromotion() {
            const promotion = await getPromotionById(params.id);

            setPromotion(promotion);
        }

        getPromotion();
    }, [ params.id ]);

    return (
        <>
            {
                promotion
                    ? <Modal
                        title="Update promotion"
                        opened
                        onClose={
                            () => {
                                router.back(); 
                            } 
                        }
                    >

                        <UpdatePromotionForm
                            id={ params.id } 
                            initialValues={
                                {
                                    name: promotion.name,
                                    discount: promotion.discount,
                                    start_at: promotion.start_at,
                                    end_at: promotion.end_at,
                                    description: promotion.description,
                                    cover_url: promotion.cover_url
                                }
                            }
                        />
                    </Modal>
                    : <Loader />
            }
        </>
    );
}