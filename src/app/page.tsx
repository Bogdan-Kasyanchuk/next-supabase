import { Metadata } from 'next';
import Link from 'next/link';

import Container from '@/components/ui/layouts/Container';

export const metadata: Metadata = {
    title: 'TrueScape | Home'
};

export default function Page() {
    return (
        <Container className="flex-center flex-col gap-10">
            <p className="text-6xl text-center font-bold">
                Welcome to CRM
                <br />
                <span className="text-red-500 text-9xl">TrueScape</span>
            </p>

            <Link
                href="admin/dashboard"
                className="text-5xl text-blue-500 hover:underline font-bold"
            >
                Go to Dashboard
            </Link>
        </Container>
    );
}