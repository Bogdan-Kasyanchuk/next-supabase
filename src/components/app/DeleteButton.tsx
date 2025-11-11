'use client';

import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';

import Button from '@/components/ui/buttons/Button';

type Props = {
    className?: string,
    action: () => Promise<void>
};

export default function DeleteButton(props: Props) {
    const [ isPending, startTransition ] = useTransition();

    return (
        <Button
            type="button"
            variant="danger"
            className={ props.className }
            disabled={ isPending }
            loading={ isPending }
            onClick={
                () => {
                    startTransition(props.action);
                }
            }
        >
            <Trash2 />
        </Button>
    );
}