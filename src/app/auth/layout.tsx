import { PropsWithChildren } from 'react';

import Container from '@/components/ui/layouts/Container';

export default function Layout(props: PropsWithChildren) {
    return (
        <Container className="flex-center">
            { props.children }
        </Container>
    );
}
