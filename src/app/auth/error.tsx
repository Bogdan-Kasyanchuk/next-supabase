'use client';

import Button from '@/components/ui/buttons/Button';

type Props = {
    error: Error,
    reset: () => void
};

export default function ErrorComponent(props: Props) {
    return (
        <div className="flex flex-col gap-10 items-center justify-center w-full h-full">
            <p>{ `Something went wrong. ${ props.error.message }` }</p>

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
    );
}
