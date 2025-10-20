import { Modal as MantineModal } from '@mantine/core';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

import cn from '@/utils/cn';

type Props = {
    title: string,
    children: ReactNode,
    className?: string,
    maxWidth?: number,
    opened: boolean,
    onClose: () => void
};

export default function Modal(props: Props) {
    return (
        <MantineModal
            title={ props.title }
            opened={ props.opened }
            onClose={ props.onClose }
            className={ cn('c-modal', props.className) }
            closeButtonProps={
                {
                    icon: <X />
                }
            }
            transitionProps={
                {
                    duration: 150,
                    timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }
            }
            style={
                {
                    '--modal-max-width': `${ props.maxWidth ?? 728 }px`
                }
            }
        >
            { props.children }
        </MantineModal>
    );
}