'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/ui/buttons/Button';
import createClient from '@/lib/supabase/client';
import { pagesAuthLoginUrl } from '@/routes';

export default function LogoutButton() {
    const router = useRouter();

    const logout = async () => {
        const supabase = createClient();

        await supabase.auth.signOut();

        router.push(pagesAuthLoginUrl());
        router.refresh();
    };

    return (
        <Button
            type="button"
            size="small"
            variant="lite"
            onClick={ logout }
        >
            Logout
        </Button>
    );
}
