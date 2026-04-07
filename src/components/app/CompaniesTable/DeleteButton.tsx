'use client';

import { toast } from 'sonner';

import { deleteCompanyAction } from '@/actions/companies';

import Button from '../DeleteButton';

type Props = {
    id: string
};

export default function DeleteButton(props: Props) {
    return (
        <Button
            action={
                async () => {
                    try {
                        await deleteCompanyAction(props.id);

                        toast.success('Company deleted successfully');
                    } catch (error) {
                        toast.error('Error deleting company', {
                            description: (error as Error).message
                        });
                    }
                } 
            }
        />
    );
}
