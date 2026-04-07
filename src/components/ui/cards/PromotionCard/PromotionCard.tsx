import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { pagesPromotionUrl } from '@/routes';
import { PromotionMapper } from '@/types';
import formateDate from '@/utils/formateDate';

import DeleteButton from './DeleteButton';

type Props = {
    promotion: PromotionMapper,
    className?: string
};

export default function PromotionCard(props: Props) {
    return (
        <div className={ clsx('c-promotion-card', props.className) }>
            <div className="c-promotion-card__inner">
                <div className="c-promotion-card__cover">
                    <Image
                        src={ props.promotion.cover_url }
                        alt={ props.promotion.name }
                        sizes="400px"
                        fill
                    />
                </div>

                <div className="c-promotion-card__discount">
                    <p className="c-promotion-card__discount-inner">
                        { `-${ props.promotion.discount }%` }
                    </p>
                </div>

                <div className="c-promotion-card__content">
                    <Link
                        href={ pagesPromotionUrl(props.promotion.id) }
                        className="c-promotion-card__title"
                    >
                        { props.promotion.name }
                    </Link>

                    <p>
                        { formateDate(props.promotion.start_at, 'DD.MM.YYYY') }
                        { ' - ' }
                        { formateDate(props.promotion.end_at, 'DD.MM.YYYY') }
                    </p>
                </div>
            </div>

            <DeleteButton id={ props.promotion.id } />
        </div>
    );
}
