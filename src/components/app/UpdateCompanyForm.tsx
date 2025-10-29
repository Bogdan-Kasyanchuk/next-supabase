import Form from 'next/form';
import Image from 'next/image';

import { updateCompany } from '@/app/admin/companies/[id]/company-update/actions';
import { CompanyStatusType } from '@/enums';
import { categories, countries, statuses } from '@/mock/data';

import SubmitButton from './SubmitButton';
import DatePicker from '../ui/inputs/DatePicker';
import Input from '../ui/inputs/Input';
import Select from '../ui/inputs/Select';
import TextArea from '../ui/inputs/TextArea';

type Props = {
    id: string,
    initialValues: {
        category: string,
        country: string,
        status: CompanyStatusType,
        logo_url: string,
        name: string,
        joined_at: string,
        income: number | null,
        sold: number | null,
        description: string | null
    }
};

export default function UpdateCompanyForm(props: Props) {
    const updateCompanyWithId = updateCompany.bind(null, props.id);

    return (
        <Form
            action={ updateCompanyWithId }
            className="c-company-form-block"
        >
            <div className="c-company-form-block__form">
                <div className="c-company-form-block__inner md:pe-2.5">
                    <div>
                        <label
                            className="f-label"
                            htmlFor="logo"
                        >
                            Logo
                            <span className="f-label__asterix">&nbsp;*</span>
                        </label>

                        <Image
                            className="rounded-full w-[160px] h-[160px] mx-auto md:w-[199px] md:h-[199px]"
                            width={ 200 }
                            height={ 200 }
                            src={ props.initialValues.logo_url }
                            alt="Logo"
                        />
                    </div>

                    <Input
                        type="text"
                        name="name"
                        label="Name"
                        placeholder="Name"
                        defaultValue={ props.initialValues.name }
                        autoComplete="off"
                        minLength={ 3 }
                        required
                    />

                    <Select
                        name="status"
                        label="Status"
                        placeholder="Select status"
                        defaultValue={ props.initialValues.status }
                        options={ statuses }
                        required
                    />

                    <Select
                        name="country"
                        label="Country"
                        placeholder="Select country"
                        defaultValue={ props.initialValues.country }
                        options={ countries }
                        required
                    />
                </div>

                <div className="c-company-form-block__inner md:ps-2.5">
                    <Select
                        name="category"
                        label="Category"
                        placeholder="Select category"
                        defaultValue={ props.initialValues.category }
                        options={ categories }
                        required
                    />
                    
                    <Input
                        type="number"
                        name="income"
                        label="Income"
                        placeholder="Income"
                        defaultValue={ props.initialValues.income ?? undefined }
                        min={ 0 }
                    />

                    <Input
                        type="number"
                        name="sold"
                        label="Sold"
                        placeholder="Sold"
                        defaultValue={ props.initialValues.sold ?? undefined }
                        min={ 0 }
                    />

                    <DatePicker
                        name="joined_at"
                        label="Joined date"
                        placeholder="DD.MM.YYYY"
                        defaultValue={ props.initialValues.joined_at }
                    />

                    <TextArea
                        name="description"
                        label="Description"
                        placeholder="Description"
                        defaultValue={ props.initialValues.description ?? undefined }
                        minLength={ 3 }
                    />
                </div>
            </div>

            <SubmitButton>
                Update company
            </SubmitButton>
        </Form>
    );
}