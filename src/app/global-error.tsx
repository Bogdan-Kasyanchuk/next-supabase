'use client';

import Container from '@/components/ui/layouts/Container';

export default function Error() {
    return (
        <html lang="en">
            <body>
                <main>
                    <Container className="flex-center">
                        <p className="text-5xl font-bold leading-[1.2]">
                            Something globally went wrong
                        </p>
                    </Container>
                </main>
            </body>
        </html>
    );
}
