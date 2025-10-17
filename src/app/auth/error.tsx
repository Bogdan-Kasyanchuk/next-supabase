'use client';

import Button from '@/components/ui/buttons/Button';

type Props = {
    error: Error,
    reset: () => void
};

export default function ErrorComponent(props: Props) {
    return (
        <div className="flex flex-col gap-5 items-center justify-center w-full">
            <p className="text-5xl font-bold leading-[1.2]">
                Something went wrong 
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
