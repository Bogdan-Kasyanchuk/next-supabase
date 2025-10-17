import { Metadata } from 'next';

import UpdatePasswordForm from '@/components/app/UpdatePasswordForm';

export const metadata: Metadata = {
    title: 'Update Password'
};

export default function Page() {
    return <UpdatePasswordForm />;
}
