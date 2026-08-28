import { UserMapper } from '@/types';

import Row from './Row';

type Props = {
    users: UserMapper[],
    currentUserId: string
};

export default function UsersTable(props: Props) {
    return (
        <table className="c-users-table">
            <thead className="c-users-table__head">
                <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Role</th>
                </tr>
            </thead>

            <tbody className="c-users-table__body">
                {
                    props.users.map(
                        user => (
                            <Row
                                key={ user.id }
                                user={ user }
                                isCurrentUser={ user.id === props.currentUserId }
                            />
                        )
                    )
                }
            </tbody>
        </table>
    );
}
