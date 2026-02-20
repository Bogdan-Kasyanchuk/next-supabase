'use client';

import { Plus_Jakarta_Sans } from 'next/font/google';

import Button from '@/components/ui/buttons/Button';

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
                    <div className="flex items-center justify-center size-full px-5 flex-col">
                        <p className="text-5xl text-primary font-bold leading-[1.2] text-center">
                            Something globally went wrong
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
                </main>
            </body>
        </html>
    );
}
