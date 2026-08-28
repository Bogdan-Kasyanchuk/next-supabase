import PromotionsList from '@/components/app/PromotionsList';
import DataNotFound from '@/components/ui/data-display/DataNotFound';
import { getPromotionsByCompany } from '@/services/admin/promotionsApi';

type Props = {
    companyId: string,
    query: string,
    canManage: boolean
};

export default async function CompanyPromotions(props: Props) {
    const promotions = await getPromotionsByCompany(props.companyId, props.query);

    return (
        promotions.length
            ? <PromotionsList
                promotions={ promotions }
                canManage={ props.canManage }
            />
            : <DataNotFound className="bg-gray-200 rounded" />
    );
}
