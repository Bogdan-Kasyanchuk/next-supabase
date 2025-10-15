import Image from 'next/image';
import Link from 'next/link';

import { deletePromotion } from '@/app/admin/promotions/actions';
import DeleteButton from '@/components/DeleteButton';
import cn from '@/lib/utils';
import { PromotionMapper } from '@/types';

type Props = {
    promotion: PromotionMapper,
    className?: string
};

export default function Promotion(props: Props) {
    return (
        <div className={ cn('relative isolate', props.className) }>
            <Link href={ `/promotions/${ props.promotion.id }` }>
                <div className="rounded overflow-hidden	bg-gray-100">
                    <div className="relative w-full h-[200px] bg-gray-300">
                        <Image
                            fill
                            src={ props.promotion.cover_url }
                            alt={ props.promotion.name }
                        />
                        <div className="w-14 h-14 absolute top-0 left-px rounded-br-full bg-lime-200" />
                        <div className="w-14 h-14 absolute inset-0 py-3 pr-3 pl-0.5 rounded-br-full bg-gray-900">
                            <p className="text-center text-xs font-bold text-lime-200">{ `-${ props.promotion.discount }%` }</p>
                        </div>
                    </div>
                    <div className="flex flex-col p-5 gap-3">
                        <p className="text-base font-semibold text-gray-900">
                            { props.promotion.name }
                        </p>
                        <p className="text-sm text-gray-900">{ props.promotion.description }</p>
                    </div>

                </div>
            </Link>

            <DeleteButton
                className="!p-2 absolute top-0 right-0 z-[1]"
                actionProps={ props.promotion.id }
                action={ deletePromotion }
            />
        </div>
    );
}
