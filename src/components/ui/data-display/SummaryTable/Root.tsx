import { PropsWithChildren, ReactNode } from 'react';

type Props = {
    headers: ReactNode
};

export default function Root(props: PropsWithChildren<Props>) {
    return (
        <table className="c-summary-table">
            <thead className="c-summary-table__head">
                <tr>{ props.headers }</tr>
            </thead>

            <tbody className="c-summary-table__body">
                { props.children }
            </tbody>
        </table>
    );
}
