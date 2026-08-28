import { CompanyMapper } from '@/types';

import Row from './Row';
import { headers } from './datasets';

type Props = {
    companies: CompanyMapper[],
    canManage: boolean
};

export default function CompaniesTable(props: Props) {
    const visibleHeaders = props.canManage ? headers : headers.slice(0, -1);

    return (
        <table className="c-companies-table">
            <thead className="c-companies-table__head">
                <tr>
                    {
                        visibleHeaders.map(
                            (header, i) => (
                                <th key={ i }>
                                    { header }
                                </th>
                            )
                        )
                    }
                </tr>
            </thead>

            <tbody className="c-companies-table__body">
                {
                    props.companies.map(
                        company => (
                            <Row
                                key={ company.id }
                                company={ company }
                                canManage={ props.canManage }
                            />
                        )
                    )
                }
            </tbody>
        </table>
    );
}
