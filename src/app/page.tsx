import { redirect } from 'next/navigation';

import { pagesDashboardUrl } from '@/routes';

export default function RootPage() {
    redirect(pagesDashboardUrl());
}