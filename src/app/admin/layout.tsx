import { redirect } from 'next/navigation';
import { PropsWithChildren, ReactNode } from 'react';

import Sidebar from '@/components/app/Sidebar';
import { createClient } from '@/lib/supabase/server';
import { pagesAuthLoginUrl } from '@/routes';

type Props = {
    modal?: ReactNode
};

export default async function Layout(props: PropsWithChildren<Props>) {
    const supabase = await createClient();
    
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        redirect(pagesAuthLoginUrl());
    }
    
    return (
        <>
            <div className="flex w-full">
                <Sidebar />

                { props.children }
            </div>

            { props.modal }
        </>
    );
}