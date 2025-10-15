import { Database } from 'lucide-react';

export default function DataNotFound() {
    return (
        <div className="c-data-not-found">
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