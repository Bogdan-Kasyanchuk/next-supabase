import { MantineProvider } from '@mantine/core';
import { PropsWithChildren, ReactNode } from 'react';

import Sidebar from '@/components/app/Sidebar';

type Props = {
    modal?: ReactNode
};

export default function Layout(props: PropsWithChildren<Props>) {
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