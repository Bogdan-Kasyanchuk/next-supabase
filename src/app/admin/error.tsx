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
            <div className="c-error">
                <p className="c-error__subtitle">
                    Sorry, something went wrong
                </p>

                <p className="c-error__text">
                    { props.error.message }
                </p>

                <Button
                    type="button"
                    size="large"
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