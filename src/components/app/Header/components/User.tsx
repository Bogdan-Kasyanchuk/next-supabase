import Image from 'next/image';

import { createClient } from '@/lib/supabase/server';

type Props = {
    id: string
};

export default async function User(props: Props) {
    const supabase = await createClient();

    const { data } = await supabase.from('profiles').select().eq('id', props.id);

    if (!data) {
        return;
    }

    const user = data[ 0 ];

    const fullName = user.last_name
        ? user.first_name + ' ' + user.last_name
        : user.first_name;

    return (
        <div className="c-header__user">
            <Image
                width={ 30 }
                height={ 30 }
                src={ user.avatar_url }
                alt={ fullName }
                className="c-header__user-avatar"
            />

            <p className="c-header__user-title">
                { fullName }
            </p>

            { /* <div className="c-header__user-info">
                <p className="c-header__user-title">
                    { fullName }
                </p>

                <p className="c-header__user-email">
                    { user.email }
                </p>
            </div> */ }
        </div>
    );
}
