import cn from '@/utils/cn';

type Props = {
    className?: string,
    classNameInner?: string
};

export default function Loader(props: Props) {
    return (
        <div className={ cn('c-loader', props.className) }>
            <div className={ cn('c-loader__inner u-spiner', props.classNameInner) } />
        </div>
    );
}