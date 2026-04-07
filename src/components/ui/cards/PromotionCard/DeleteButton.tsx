'use client';

import { toast } from 'sonner';

import { deletePromotionAction } from '@/actions/promotions';
import Button from '@/components/app/DeleteButton';

type Props = {
    id: string
};

export default function PromotionCard(props: Props) {
    return (
        <Button
            className="c-promotion-card__delete"
            action={
                async () => {
                    try {
                        await deletePromotionAction( props.id);

                        toast.success('Promotion deleted successfully');
                    } catch (error) {
                        toast.error('Error deleting promotion', {
                            description: (error as Error).message
                        });
                    }
                } 
            }
        />
    );
}
