'use client';

import { Plus_Jakarta_Sans } from 'next/font/google';

import Button from '@/components/ui/buttons/Button';
import Container from '@/components/ui/layouts/Container';

import '@/styles/app.css';

const font = Plus_Jakarta_Sans({ subsets: [ 'latin' ] });

type Props = {
    error: Error,
    reset: () => void
};

export default function GlobalError(props: Props) {
    return (
        <html lang="en">
            <body className={ font.className }>
                <main>
                    <Container className="flex-center">
                        <div className="flex-center flex-col gap-5 text-secondary text-center mx-auto">
                            <p className="text-5xl font-bold leading-[1.2]">
                                 Sorry, something globally went wrong
                            </p>

                            <p className="text-md leading-[1.2]">
                                { props.error.message }
                            </p>

                            <Button
                                type="button"
                                onClick={
                                    () => {
                                        props.reset();
                                    }
                                }
                            >
                                Try again
                            </Button>
                        </div>
                    </Container>
                </main>
            </body>
        </html>
    );
}
