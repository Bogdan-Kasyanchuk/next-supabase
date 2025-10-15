import Container from '@/components/ui/layouts/Container';

export default function Footer() {
    return (
        <footer className="c-footer">
            <Container
                size="full"
                className="c-footer__container"
            >
                <p className="c-footer__text">
                    © 2025. All rights reserved.
                </p>
            </Container>
        </footer>
    );
}
