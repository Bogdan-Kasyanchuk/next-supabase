import Image from 'next/image';

import { BadgeStatusType, CompanyStatusType } from '@/enums';
import { CompanyDetailsMapper } from '@/types';
import formatCurrency from '@/utils/formatCurrency';
import formateDate from '@/utils/formateDate';

import Badge from '../data-display/Badge';

const statusTypes = {
    [ CompanyStatusType.ACTIVE ]: {
        label: 'Active',
        badgeType: BadgeStatusType.SUCCESS
    },
    [ CompanyStatusType.NOT_ACTIVE ]: {
        label: 'Not active',
        badgeType: BadgeStatusType.DANGER
    },
    [ CompanyStatusType.PENDING ]: {
        label: 'Pending',
        badgeType: BadgeStatusType.WARNING
    },
    [ CompanyStatusType.SUSPENDED ]: {
        label: 'Suspended',
        badgeType: BadgeStatusType.INFO
    }
};

type Props = {
    company: CompanyDetailsMapper
};

export default function CompanyDetailsCard(props: Props) {
    const status = statusTypes[ props.company.status ];
        
    return (
        <div className="c-company-details-card">
            <div className="c-company-details-card__head">
                <Image
                    src={ props.company.logo_url }
                    alt={ props.company.name }
                    width={ 100 }
                    height={ 100 }
                />

                <p className="c-company-details-card__name">{ props.company.name }</p>

                <Badge type={ status.badgeType }>
                    { status.label }
                </Badge>
            </div>

            <div className="c-company-details-card__content">
                <p className="c-company-details-card__content-title">
                    About company
                </p>

                <dl className="c-company-details-card__content-list">
                    <div className="c-company-details-card__content-item">
                        <dt>Category:</dt>
                        <dd>{ props.company.category.label }</dd>
                    </div>

                    <div className="c-company-details-card__content-item">
                        <dt>Country:</dt>
                        <dd>{ props.company.country.label }</dd>
                    </div>

                    <div className="c-company-details-card__content-item">
                        <dt>Joined date:</dt>
                        <dd>{ formateDate(props.company.joined_at, 'DD.MM.YYYY') }</dd>
                    </div>

                    {
                        props.company.income &&
                        <div className="c-company-details-card__content-item">
                            <dt>Income:</dt>
                            <dd>${ formatCurrency(props.company.income ) }</dd>
                        </div>
                    }

                    {
                        props.company.sold &&
                        <div className="c-company-details-card__content-item">
                            <dt>Sold:</dt>
                            <dd>${ formatCurrency(props.company.sold ) }</dd>
                        </div>
                    }
                </dl>

                {
                    props.company.description &&
                    <p className="c-company-details-card__content-description">
                        { props.company.description }
                    </p>
                }
            </div>
        </div>
    );
}
