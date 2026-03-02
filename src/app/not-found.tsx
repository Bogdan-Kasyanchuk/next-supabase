import { Metadata } from 'next';
import Link from 'next/link';

import Button from '@/components/ui/buttons/Button';
import Container from '@/components/ui/layouts/Container';
import { pagesHomeUrl } from '@/routes';

export const metadata: Metadata = {
    title: '404'
};

export default function NotFound() {
    return (
        <Container className="flex-center">
            <div className="c-error">
                <h2 className="c-error__title">
                    <span className="sr-only">Error</span>404
                </h2>

                <p className="c-error__subtitle">
                    Sorry, we couldn&apos;t find this page.
                </p>

                <p className="c-error__text">
                    But dont worry, you can find plenty of other things on homepage.
                </p>

                <Button
                    component={ Link }
                    href={ pagesHomeUrl() }
                >
                    Back to home page
                </Button>
            </div>
        </Container>
    );
}