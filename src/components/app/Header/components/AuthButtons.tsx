'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Button from '@/components/ui/buttons/Button';
import {
    pagesAuthForgotPasswordUrl,
    pagesAuthLoginUrl,
    pagesAuthSignUpUrl,
    pagesHomeUrl
} from '@/routes';

export default function AuthButtons() {
    const pathname = usePathname();

    if (pathname !== pagesHomeUrl() && pathname !== pagesAuthLoginUrl() && pathname !== pagesAuthSignUpUrl() && pathname !== pagesAuthForgotPasswordUrl()) {
        return null;
    }

    return (
        <div className="c-header__auth-buttons">
            {
                pathname !== pagesAuthLoginUrl() &&
                <Button
                    component={ Link }
                    size="small"
                    variant="lite"
                    href={ pagesAuthLoginUrl() }
                >
                    Login
                </Button>
            }

            {
                pathname !== pagesAuthSignUpUrl() &&
                <Button
                    component={ Link }
                    size="small"
                    variant="lite"
                    href={ pagesAuthSignUpUrl() }
                >
                    Sign up
                </Button>
            }
        </div>
    );
}