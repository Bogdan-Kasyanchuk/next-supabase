'use client';

import Error404 from '@/components/ui/data-display/Error404';
import Container from '@/components/ui/layouts/Container';

export default function NotFound() {
    return (
        <Container className="flex items-center justify-center">
            <Error404 />
        </Container>
    );
}