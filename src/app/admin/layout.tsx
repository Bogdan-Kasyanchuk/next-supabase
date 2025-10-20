import { MantineProvider } from '@mantine/core';
import { redirect } from 'next/navigation';
import { PropsWithChildren, ReactNode } from 'react';

import Sidebar from '@/components/app/Sidebar';
import createSupabaseServerClient from '@/lib/supabase/server';
import { pagesAuthLoginUrl } from '@/routes';

type Props = {
    modal?: ReactNode
};

export default async function Layout(props: PropsWithChildren<Props>) {
    const supabase = await createSupabaseServerClient();
    
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        redirect(pagesAuthLoginUrl());
    }
    
    return (
        <MantineProvider>
            <div className="flex w-full">
                <Sidebar />

                <div className="flex grow relative min-w-px">
                    { props.children }
                </div>
            </div>

            { props.modal }
        </MantineProvider>
    );
}