import CompanyForm from '@/components/app/CompanyForm';

export default function Page() {
    return (
        <div className="flex flex-col w-full justify-center-safe overflow-y-auto">
            <div className="p-5 shadow-custom w-full mx-auto max-w-[768px]">
                <CompanyForm mode="create" />
            </div>
        </div>
    );
}