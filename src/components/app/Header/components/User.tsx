import Image from 'next/image';

import createSupabaseServer from '@/lib/supabase/server';
import { ProfileMapper } from '@/types';

type Props = {
    id: string
};

export default async function User(props: Props) {
    const supabase = await createSupabaseServer();

    const { data, error } = await supabase
        .from('profiles')
        .select('avatar_url, first_name, last_name')
        .eq('id', props.id)
        .single();

    if (error) {
        window.console.error(`Failed to load user: ${ error.message }`);
    }

    if (!data) {
        return null;
    }

    const user = data as ProfileMapper;

    const fullName = user.last_name
        ? `${ user.first_name } ${ user.last_name }`
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
        </div>
    );
}
