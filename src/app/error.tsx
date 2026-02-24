'use client';

import Button from '@/components/ui/buttons/Button';
import Container from '@/components/ui/layouts/Container';

type Props = {
    error: Error,
    reset: () => void
};

export default function Error(props: Props) {
    return (
        <Container>   
            <div className="flex items-center justify-center size-full px-5 flex-col gap-5 text-secondary text-center">
                <p className="text-5xl font-bold leading-[1.2]">
                    Sorry, something went wrong
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
    );
}