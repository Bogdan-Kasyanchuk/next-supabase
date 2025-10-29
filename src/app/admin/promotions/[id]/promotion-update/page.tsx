import UpdatePromotionForm from '@/components/app/UpdatePromotionForm';

import { getPromotionById } from '../actions';

type Props = {
    params: Promise<{ id: string }>
};

export default async function Page(props: Props) {
    const params = await props.params;

    const promotion = await getPromotionById(params.id);

    return (
        <div className="flex flex-col w-full justify-center-safe overflow-y-auto">
            <div className="p-5 shadow-custom w-full mx-auto max-w-[768px]">
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
            </div>
        </div>
    );
}