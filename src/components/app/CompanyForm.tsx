import Form from 'next/form';
import Image from 'next/image';

import { createCompanyAction, updateCompanyAction } from '@/actions/companies';
import DatePicker from '@/components/ui/inputs/DatePicker';
import Input from '@/components/ui/inputs/Input';
import Select from '@/components/ui/inputs/Select';
import TextArea from '@/components/ui/inputs/TextArea';
import { categories, countries, statuses } from '@/datasets/constants';
import { CompanyStatusType } from '@/enums';
import { randomImage } from '@/mock/randomImage';

import SubmitButton from './SubmitButton';

type CompanyFormValues = {
    category: string,
    country: string,
    status: CompanyStatusType,
    logo_url: string,
    name: string,
    joined_at: string,
    income: number | null,
    sold: number | null,
    description: string | null
};

type Props =
    | { mode: 'create' }
    | { mode: 'update', id: string, initialValues: CompanyFormValues };

export default async function CompanyForm(props: Props) {
    const action = props.mode === 'create'
        ? createCompanyAction
        : updateCompanyAction.bind(null, props.id);

    const logo = props.mode === 'create' ? randomImage(200, 200) : props.initialValues.logo_url;
    const initialValues = props.mode === 'update' ? props.initialValues : undefined;

    return (
        <Form
            action={ action }
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
                            src={ logo }
                            alt="Logo"
                        />

                        {
                            props.mode === 'create' &&
                            <input
                                id="logo"
                                type="text"
                                name="logo_url"
                                defaultValue={ logo }
                                className="hidden"
                            />
                        }
                    </div>

                    <Input
                        type="text"
                        name="name"
                        label="Name"
                        placeholder="Name"
                        defaultValue={ initialValues?.name }
                        autoComplete="off"
                        minLength={ 3 }
                        required
                    />

                    <Select
                        name="status"
                        label="Status"
                        placeholder="Select status"
                        defaultValue={ initialValues?.status }
                        options={ statuses }
                        required
                    />

                    <Select
                        name="country"
                        label="Country"
                        placeholder="Select country"
                        defaultValue={ initialValues?.country }
                        options={ countries }
                        required
                    />
                </div>

                <div className="c-company-form-block__inner md:ps-2.5">
                    <Select
                        name="category"
                        label="Category"
                        placeholder="Select category"
                        defaultValue={ initialValues?.category }
                        options={ categories }
                        required
                    />

                    <Input
                        type="number"
                        name="income"
                        label="Income"
                        placeholder="Income"
                        defaultValue={ initialValues?.income ?? undefined }
                        min={ 0 }
                    />

                    <Input
                        type="number"
                        name="sold"
                        label="Sold"
                        placeholder="Sold"
                        defaultValue={ initialValues?.sold ?? undefined }
                        min={ 0 }
                    />

                    <DatePicker
                        name="joined_at"
                        label="Joined date"
                        placeholder="DD.MM.YYYY"
                        defaultValue={ initialValues?.joined_at }
                    />

                    <TextArea
                        name="description"
                        label="Description"
                        placeholder="Description"
                        defaultValue={ initialValues?.description ?? undefined }
                    />
                </div>
            </div>

            <SubmitButton>
                { props.mode === 'create' ? 'Create company' : 'Update company' }
            </SubmitButton>
        </Form>
    );
}
