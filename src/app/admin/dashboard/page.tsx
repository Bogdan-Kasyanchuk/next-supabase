import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard'
};

export default function Page() {
    return (
        <div className="l-page__content">
            Dashboard
        </div>
    );
}
