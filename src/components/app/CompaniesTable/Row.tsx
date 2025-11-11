'use client';

import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

import { deleteCompany } from '@/app/admin/companies/actions';
import Badge from '@/components/ui/data-display/Badge';
import { BadgeStatusType, CompanyStatusType } from '@/enums';
import { pagesCompanyUrl } from '@/routes';
import { CompanyMapper } from '@/types';
import cn from '@/utils/cn';
import formateDate from '@/utils/formateDate';

import DeleteButton from '../DeleteButton';

const statusTypes = {
    [ CompanyStatusType.ACTIVE ]: {
        class: 'border-success',
        label: 'Active',
        badgeType: BadgeStatusType.SUCCESS
    },
    [ CompanyStatusType.NOT_ACTIVE ]: {
        class: 'border-danger',
        label: 'Not active',
        badgeType: BadgeStatusType.DANGER
    },
    [ CompanyStatusType.PENDING ]: {
        class: 'border-warning',
        label: 'Pending',
        badgeType: BadgeStatusType.WARNING
    },
    [ CompanyStatusType.SUSPENDED ]: {
        class: 'border-info',
        label: 'Suspended',
        badgeType: BadgeStatusType.INFO
    }
};

type Props = {
    company: CompanyMapper
};

export default function Row(props: Props) {
    const status = statusTypes[ props.company.status ];

    return (
        <tr>
            <td className={ cn('c-companies-table__name', status.class) }>
                <div className="c-companies-table__name-inner">
                    <Image
                        width={ 32 }
                        height={ 32 }
                        src={ props.company.logo_url }
                        alt={ props.company.name }
                    />

                    <Link
                        href={ pagesCompanyUrl(props.company.id) }
                        className="u-link-overlay"
                    >

                        { props.company.name }
                    </Link>
                </div>
            </td>

            <td>
                { props.company.category.label }
            </td>

            <td>
                <Badge type={ status.badgeType }>
                    { status.label }
                </Badge>
            </td>

            <td>
                <Badge
                    type={
                        props.company.has_promotions
                            ? BadgeStatusType.SUCCESS
                            : BadgeStatusType.DANGER 
                    }
                >
                    { props.company.has_promotions ? 'Yes' : 'No' }
                </Badge>
            </td>

            <td>{ props.company.country.label }</td>

            <td>
                { formateDate(props.company.joined_at, 'DD.MM.YYYY') }
            </td>
            
            <td className="c-companies-table__delete">
                <DeleteButton
                    action={
                        async () => {
                            try {
                                await deleteCompany(props.company.id);

                                toast.success('Company deleted successfully');
                            } catch (error) {
                                toast.error('Error deleting company', {
                                    description: (error as Error).message
                                });
                            }
                        } 
                    }
                />
            </td>
        </tr>
    );
}
