import { CompanyMapper } from '@/types';

import Row from './Row';
import { headers } from './datasets';

type Props = {
    companies: CompanyMapper[]
};

export default function CompaniesTable(props: Props) {
    return (
        <table className="c-companies-table">
            <thead className="c-companies-table__head">
                <tr>
                    {
                        headers.map(
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
                            />
                        )
                    )
                }
            </tbody>
        </table>
    );
}
