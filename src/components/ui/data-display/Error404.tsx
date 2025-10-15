import Link from 'next/link';

import { pagesHomeUrl } from '@/routes';

import Button from '../buttons/Button';

export default function Error404() {
    return (
        <div className="c-error-404">
            <h2 className="c-error-404__title">
                <span className="sr-only">Error</span>404
            </h2>

            <p className="c-error-404__subtitle">
                Sorry, we couldn&apos;t find this page.
            </p>

            <p className="c-error-404__text">
                But dont worry, you can find plenty of other things on homepage.
            </p>

            <Button
                component={ Link }
                size="large"
                href={ pagesHomeUrl() }
            >
                Back to homepage
            </Button>
        </div>
    );
}