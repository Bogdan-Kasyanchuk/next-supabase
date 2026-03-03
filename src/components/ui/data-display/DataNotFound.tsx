import clsx from 'clsx';
import { Database } from 'lucide-react';

type Props = {
    className?: string 
};

export default function DataNotFound(props: Props) {
    return (
        <div className={ clsx('c-data-not-found', props.className) }>
            <Database size={ 80 } />

            <p className="c-data-not-found__title">
                Data not found
            </p>

            <p className="c-data-not-found__text">
                There is no data to show you right now.
            </p>
        </div>
    );
}