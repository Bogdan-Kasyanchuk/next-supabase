import Image from 'next/image';

import { PromotionDetailsMapper } from '@/types';
import formateDate from '@/utils/formateDate';

type Props = {
    promotion: PromotionDetailsMapper
};

export default function PromotionDetailsCard(props: Props) {
    return (
        <div className="c-promotion-details-card">
            <div className="c-promotion-details-card__cover">
                <Image
                    fill
                    src={ props.promotion.cover_url }
                    alt={ props.promotion.name }
                />
            </div>

            <div className="c-promotion-details-card__discount">
                <p className="c-promotion-details-card__discount-inner">
                    { `-${ props.promotion.discount }%` }
                </p>
            </div>

            <div className="c-promotion-details-card__content">
                <p className="c-promotion-details-card__title">
                    { props.promotion.name }
                </p>

                <p>
                    { formateDate(props.promotion.start_at, 'DD.MM.YYYY') }
                    { ' - ' }
                    { formateDate(props.promotion.end_at, 'DD.MM.YYYY') }
                </p>

                <p>{ props.promotion.description }</p>
            </div>
        </div>
    );
}
