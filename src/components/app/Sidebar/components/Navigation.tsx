'use client';

import clsx from 'clsx';
import { BadgePercent, BriefcaseBusiness, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { pagesCompaniesUrl, pagesDashboardUrl, pagesPromotionsUrl } from '@/routes';

const links = [
    {
        name: 'Dashboard',
        href: pagesDashboardUrl(),
        icon: () => <LayoutGrid />
    },
    {
        name: 'Companies',
        href: pagesCompaniesUrl(),
        icon: () => <BriefcaseBusiness />
    },
    {
        name: 'Promotions',
        href: pagesPromotionsUrl(),
        icon: () => <BadgePercent />
    }
];

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="c-sidebar__navigation">
            <ul className="c-sidebar__navigation-list">
                {
                    links.map(
                        link => (
                            <li
                                key={ link.name }
                                className={
                                    clsx('c-sidebar__navigation-item', {
                                        'c-sidebar__navigation-item--active': pathname === link.href
                                    })
                                }
                            >
                                <Link href={ link.href }>
                                    { link.icon() }

                                    { link.name }
                                </Link>
                            </li>
                        )
                    )
                }
            </ul>
        </nav>
    );
}
