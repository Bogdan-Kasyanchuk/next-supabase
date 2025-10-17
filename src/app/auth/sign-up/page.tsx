import { Metadata } from 'next';

import SignUpForm from '@/components/app/SignUpForm';

export const metadata: Metadata = {
    title: 'Sign Up'
};

export default function Page() {
    return <SignUpForm />;
}
