import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

import { pagesHomeUrl } from '@/routes';
import cn from '@/utils/cn';

type Props = {
    className?: string
};

export default function Logo(props: PropsWithChildren<Props>) {
    return (
        <Link
            href={ pagesHomeUrl() }
            className={ cn('c-logo u-link', props.className) }
        >
            <Image
                width={ 122 }
                height={ 25 }
                src="/svg/logo.svg"
                alt="logo"
                className="c-logo__img"
            />

            <span className="sr-only">CRM TrueScape</span>
        </Link>
    );
}
