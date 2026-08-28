import Image from 'next/image';

import { UserMapper } from '@/types';

import RoleSelect from './RoleSelect';

type Props = {
    user: UserMapper,
    isCurrentUser: boolean
};

export default function Row(props: Props) {
    const fullName = props.user.last_name
        ? `${ props.user.first_name } ${ props.user.last_name }`
        : props.user.first_name;

    return (
        <tr>
            <td className="c-users-table__email">
                { props.user.email }
            </td>

            <td className="c-users-table__name">
                <div className="c-users-table__name-inner">
                    <Image
                        width={ 30 }
                        height={ 30 }
                        src={ props.user.avatar_url }
                        alt={ fullName }
                        className="c-users-table__avatar"
                    />

                    { fullName }
                    { props.isCurrentUser && ' (you)' }
                </div>
            </td>

            <td className="c-users-table__role">
                <RoleSelect
                    userId={ props.user.id }
                    role={ props.user.role }
                    disabled={ props.isCurrentUser }
                />
            </td>
        </tr>
    );
}
