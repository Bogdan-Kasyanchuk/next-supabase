'use client';

import Container from '@/components/ui/layouts/Container';

export default function Error() {
    return (
        <html lang="en">
            <body>
                <main>
                    <Container className="flex items-center justify-center">
                        <p className="text-5xl">Something globally went wrong</p>
                    </Container>
                </main>
            </body>
        </html>
    );
}
