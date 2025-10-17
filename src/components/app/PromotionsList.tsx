import { PromotionMapper } from '@/types';

import PromotionCard from '../ui/cards/PromotionCard';

type Props = {
    promotions: PromotionMapper[]
};

export default async function PromotionsList(props: Props) {
    return (
        <div className="c-promotions-list">
            {
                props.promotions.map(
                    promotion => (
                        <PromotionCard
                            key={ promotion.id }
                            promotion={ promotion }
                        />
                    )
                )
            }
        </div>
    );
}
