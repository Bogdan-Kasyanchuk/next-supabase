import { Plus_Jakarta_Sans } from 'next/font/google';
import { PropsWithChildren, ReactNode } from 'react';

// import Footer from '@/components/app/Footer';
import Header from '@/components/app/Header';

import type { Metadata } from 'next';

import '@/styles/app/base.css';

const font = Plus_Jakarta_Sans({ subsets: [ 'latin' ] });

export const metadata: Metadata = {
    title: {
        template: 'TrueScape | %s',
        default: 'TrueScape'
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
                
                { /* <Footer /> */ }
            </body>
        </html>
    );
}