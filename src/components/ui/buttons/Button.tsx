import { createPolymorphicComponent } from '@mantine/utils';
import { VariantProps, cva } from 'class-variance-authority';
import Link from 'next/link';
import { ComponentPropsWithRef } from 'react';

import cn from '@/utils/cn';

const buttonVariants = cva('c-button', {
    variants: {
        variant: {
            'dark': 'c-button--dark',
            'lite': 'c-button--lite',
            'danger': 'c-button--danger',
            'outline-dark': 'c-button--outline-dark'
        },
        size: {
            small: 'c-button--small',
            medium: 'c-button--medium',
            large: 'c-button--large'
        }
    },
    defaultVariants: {
        variant: 'dark',
        size: 'medium'
    }
});

type Props = ComponentPropsWithRef<'button'> & {
    component?: any,
    loading?: boolean
} & VariantProps<typeof buttonVariants>;

function Button(props: Props) {
    const {
        component: Component = 'button',
        children,
        variant,
        size,
        loading,
        className,
        disabled,
        ...rest
    } = props;

    const isLoading = loading && Component !== 'a' && Component !== Link;

    return (
        <Component
            className={
                cn([
                    buttonVariants({ variant, size }),
                    { 
                        'c-button--loading': isLoading,
                        'c-button--disabled': disabled
                    },
                    className
                ])
            }
            disabled={ disabled }
            { ...rest }
        >
            { children }
        </Component>
    );
}

export default createPolymorphicComponent<'button', Props>(Button);