'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import Button from '@/components/ui/buttons/Button';
import createSupabaseBrowserClient from '@/lib/supabase/client';
import { pagesAuthLoginUrl } from '@/routes';

export default function LogoutButton() {
    const router = useRouter();

    const [ isPending, startTransition ] = useTransition();

    const logout = async () => {
        const supabase = createSupabaseBrowserClient();

        await supabase.auth.signOut();

        router.replace(pagesAuthLoginUrl());
        router.refresh();
    };

    return (
        <Button
            type="button"
            size="small"
            variant="lite"
            disabled={ isPending }
            loading={ isPending }
            onClick={
                async () => {
                    startTransition(
                        async () => {
                            await logout();
                        }
                    );
                }
            }
        >
            Logout
        </Button>
    );
}
