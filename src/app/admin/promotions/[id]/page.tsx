import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Toolbar from '@/components/app/Toolbar';
import ActionButton from '@/components/app/Toolbar/components/ActionButton';
import PromotionDetailsCard from '@/components/ui/cards/PromotionDetailsCard';
import { pagesPromotionUpdateUrl } from '@/routes';
import { getPromotionById } from '@/services/promotionsApi';

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;

    const promotion = await getPromotionById(params.id);

    if (!promotion) {
        notFound();
    }

    return {
        title: promotion.name
    };
}

type Props = {
    params: Promise<{ id: string }>
};

export default async function Page(props: Props) {
    const params = await props.params;

    const promotion = await getPromotionById(params.id);

    if (!promotion) {
        notFound();
    }

    return (
        <div className="flex flex-col w-full">
            <Toolbar
                actions={
                    <ActionButton
                        rout={ pagesPromotionUpdateUrl(params.id) }
                        label="Update promotion"
                    />
                }
                className="flex-row-reverse"
            />

            <div className="p-5 grow overflow-y-auto">
                <div className="w-full max-w-[538px]">
                    <PromotionDetailsCard promotion={ promotion } />
                </div>
            </div>
        </div>
    );
}