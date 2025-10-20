'use client';

import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

import Button from '../ui/buttons/Button';

type Props = {
    children: ReactNode
};

export default function SubmitButton(props: Props) {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            size="large"
            className="w-full"
            disabled={ pending }
            loading={ pending }
        >
            { props.children }
        </Button>
    );
}
