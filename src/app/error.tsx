'use client';

import Button from '@/components/ui/buttons/Button';

type Props = {
    error: Error,
    reset: () => void
};

export default function Error(props: Props) {
    return (
        <div className="flex-center flex-col gap-5 w-full">
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
    );
}