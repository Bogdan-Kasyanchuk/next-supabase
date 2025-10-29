import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

import Container from '@/components/ui/layouts/Container';
import createSupabaseServerClient from '@/lib/supabase/server';
import { pagesDashboardUrl } from '@/routes';

export default async function Layout(props: PropsWithChildren) {
    const supabase = await createSupabaseServerClient();
        
    const { data } = await supabase.auth.getUser();
    
    if (data?.user) {
        redirect(pagesDashboardUrl());
    }
        
    return (
        <Container className="flex-center">
            { props.children }
        </Container>
    );
}
