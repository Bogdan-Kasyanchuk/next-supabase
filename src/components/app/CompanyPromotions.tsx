import PromotionsList from '@/components/app/PromotionsList';
import DataNotFound from '@/components/ui/data-display/DataNotFound';

import { getPromotionsByCompany } from '../../app/admin/companies/[id]/actions';

type Props = {
    companyId: string,
    query: string
};

export default async function CompanyPromotions(props: Props) {
    const promotions = await getPromotionsByCompany(props.companyId, props.query);

    return (
        promotions.length
            ? <PromotionsList promotions={ promotions } />
            : <DataNotFound className="bg-gray-200 rounded" />
    );
}
