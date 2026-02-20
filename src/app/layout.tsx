import { Plus_Jakarta_Sans } from 'next/font/google';
import { PropsWithChildren, ReactNode } from 'react';
import { Toaster } from 'sonner';

import Header from '@/components/app/Header';

import type { Metadata } from 'next';

import '@/styles/app/base.css';

const font = Plus_Jakarta_Sans({ subsets: [ 'latin' ] });

export const metadata: Metadata = {
    title: {
        default: 'TrueScape',
        template: 'TrueScape | %s'
    },
    description: 'The fastest way to build apps with Next.js and Supabase',
    keywords: 'CRM'
};

type Props = {
    title: ReactNode
};

export default function RootLayout(props: PropsWithChildren<Props>) {
    return (
        <html lang="en">
            <body className={ font.className }>
                <Header>{ props.title }</Header>

                <main>
                    { props.children }
                </main>

                <Toaster
                    richColors
                    position="top-right"
                    toastOptions={
                        {
                            style: {
                                padding: '10px'
                            }
                        }
                    }
                />
            </body>
        </html>
    );
}