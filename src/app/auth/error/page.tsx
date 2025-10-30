import { Metadata } from 'next';
import Link from 'next/link';

import Button from '@/components/ui/buttons/Button';
import { pagesHomeUrl } from '@/routes';

export const metadata: Metadata = {
    title: 'Error'
};

type Props = {
    searchParams: Promise<{ error: string }>
};

export default async function Page(props: Props) {
    const searchParams = await props.searchParams;

    return (
        <div className="c-auth-form-block">
            <h2 className="c-auth-form-block__title">
                Sorry, something went wrong.
            </h2>

            <div className="c-auth-form-block__text">
                {
                    searchParams.error 
                        ? <p>Code error: { searchParams.error }</p>
                        : <p>An unspecified error occurred.</p>
                }
            </div>

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
