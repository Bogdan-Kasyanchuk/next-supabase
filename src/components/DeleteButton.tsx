'use client';

import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';

import Button from '@/components/ui/buttons/Button';

type Props<T> = {
    actionProps: T,
    className: string,
    action: (args: T) => Promise<void>
};

export default function DeleteButton<T>(props: Props<T>) {
    const [ isPending, startTransition ] = useTransition();

    return (
        <Button
            type="button"
            className={ props.className }
            disabled={ isPending }
            loading={ isPending }
            onClick={
                async () => {
                    startTransition(
                        async () => {
                            await props.action(props.actionProps);
                        }
                    );
                }
            }
        >
            <Trash2 />
        </Button>
    );
}