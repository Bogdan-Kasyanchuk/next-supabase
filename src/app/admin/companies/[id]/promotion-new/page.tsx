import CreatePromotionForm from '@/components/app/CreatePromotionForm';

type Props = {
    params: Promise<{ id: string }>
};

export default async function Page(props: Props) {
    const params = await props.params;

    return (
        <div className="flex flex-col w-full justify-center-safe overflow-y-auto">
            <div className="p-5 shadow-custom w-full mx-auto max-w-[768px]">
                <CreatePromotionForm companyId={ params.id } />
            </div>
        </div>
    );
}