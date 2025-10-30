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
                    src={ props.promotion.cover_url }
                    alt={ props.promotion.name }
                    sizes="540px"
                    fill
                />
            </div>

            <div className="c-promotion-details-card__discount">
                <p className="c-promotion-details-card__discount-inner">
                    { `-${ props.promotion.discount }%` }
                </p>
            </div>

            <div className="c-promotion-details-card__content">
                <p className="c-promotion-details-card__content-title">
                    { props.promotion.name }
                </p>

                <dl className="c-promotion-details-card__content-list">
                    <div className="c-promotion-details-card__content-item">
                        <dt>Start date:</dt>
                        <dd>{ formateDate(props.promotion.start_at, 'DD.MM.YYYY') }</dd>
                    </div>
                    
                    <div className="c-promotion-details-card__content-item">
                        <dt>End date:</dt>
                        <dd>{ formateDate(props.promotion.end_at, 'DD.MM.YYYY') }</dd>
                    </div>
                </dl>

                <p className="c-promotion-details-card__content-description">
                    { props.promotion.description }
                </p>
            </div>
        </div>
    );
}
