import cn from '@/lib/utils';

type Props = {
    className?: string,
    classNameInner?: string
};

export default function Loader(props: Props) {
    return (
        <div className={ cn('c-loader', props.className) }>
            <div className={ cn('c-loader__inner', props.classNameInner) } />
        </div>
    );
}