'use client';

import { FallbackProps } from 'react-error-boundary';
import { ErrorBoundary, ErrorBoundaryProps } from 'react-error-boundary';

import Button from '@/components/ui/buttons/Button';

export default function CustomErrorBoundary(props: Omit<ErrorBoundaryProps, 'FallbackComponent'>) {
    return (
        <ErrorBoundary FallbackComponent={ ErrorFallback }>
            { props.children }
        </ErrorBoundary>

    );
}

function ErrorFallback(props: FallbackProps) {
    return (
        <div className="c-error">
            <p className="c-error__subtitle">
                Sorry, something went wrong
            </p>

            <p className="c-error__text">
                {
                    props.error instanceof Error
                        ? props.error.message
                        : 'An error occurred' 
                }
            </p>

            <Button
                type="button"
                size="large"
                onClick={
                    () => {
                        props.resetErrorBoundary();
                    }
                }
            >
                    Try again
            </Button>
        </div>

    );
}