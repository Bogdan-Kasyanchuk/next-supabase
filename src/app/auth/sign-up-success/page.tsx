import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign Up Success'
};

export default function Page() {
    return (
        <div className="c-auth-form-block">
            <h2 className="c-auth-form-block__title">
                Thank you for signing up!
            </h2>

            <div className="c-auth-form-block__text">
                <p>You&apos;ve successfully signed up.</p>
                
                <p>
                    Please check your email to confirm your account before signing in.
                </p>
            </div>
        </div>
    );
}
