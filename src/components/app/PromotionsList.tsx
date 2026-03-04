import PromotionCard from '@/components/ui/cards/PromotionCard';
import { PromotionMapper } from '@/types';

type Props = {
    promotions: PromotionMapper[]
};

export default function PromotionsList(props: Props) {
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
