import { Metadata } from 'next';

import ForgotPasswordForm from '@/components/app/ForgotPasswordForm';

export const metadata: Metadata = {
    title: 'Forgot Password'
};

export default function Page() {
    return <ForgotPasswordForm />;
}
