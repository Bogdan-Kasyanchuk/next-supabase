import { Metadata } from 'next';

import LoginForm from '@/components/app/LoginForm';

export const metadata: Metadata = {
    title: 'Login'
};

export default function Page() {
    return <LoginForm />;
}
