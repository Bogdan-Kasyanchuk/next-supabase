'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';

import { updateUserRoleAction } from '@/actions/users';
import Select from '@/components/ui/inputs/Select';
import { ProfileRoleType } from '@/enums';

const roleOptions = [
    { label: 'Superadmin', value: ProfileRoleType.SUPERADMIN },
    { label: 'Admin', value: ProfileRoleType.ADMIN },
    { label: 'Viewer', value: ProfileRoleType.VIEWER }
];

type Props = {
    userId: string,
    role: ProfileRoleType,
    disabled?: boolean
};

export default function RoleSelect(props: Props) {
    const [ isPending, startTransition ] = useTransition();

    return (
        <Select
            value={ props.role }
            options={ roleOptions }
            disabled={ props.disabled || isPending }
            required
            onChange={
                value => {
                    if (!value || value === props.role) {
                        return;
                    }

                    startTransition(async () => {
                        try {
                            await updateUserRoleAction(props.userId, value as ProfileRoleType);

                            toast.success('Role updated successfully');
                        } catch (error) {
                            toast.error('Error updating role', {
                                description: (error as Error).message
                            });
                        }
                    });
                }
            }
        />
    );
}
