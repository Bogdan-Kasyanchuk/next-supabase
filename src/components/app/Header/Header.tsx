import { PropsWithChildren } from 'react';

import Logo from '@/components/ui/data-display/Logo';
import Container from '@/components/ui/layouts/Container';
import createSupabaseServer from '@/lib/supabase/server';

import AuthButtons from './components/AuthButtons';
import LogoutButton from './components/LogoutButton';
import User from './components/User';

export default async function Header(props: PropsWithChildren) {
    const supabase = await createSupabaseServer();
    
    const { data } = await supabase.auth.getUser();

    return (
        <header className="c-header">
            <Container
                className="c-header__container"
                full
            >
                <Logo />

                <div className="c-header__right">
                    {
                        props.children &&
                        <h2 className="c-header__title">{ props.children }</h2>
                    }

                    {
                        data.user
                            ? <>
                                <User id={ data.user.id } />
                                <LogoutButton />
                            </>
                            : <AuthButtons />
                    }
                </div>
            </Container>
        </header>
    );
}
