'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/ui/buttons/Button';

type Props = {
    label: string,
    rout: string
};

export default function ActionButton(props: Props) {
    const router = useRouter();

    return (
        <Button
            type="button"
            onClick={
                () => {
                    router.push(props.rout, { scroll: false });
                }
            }
        >
            { props.label }
        </Button>
    );
}
