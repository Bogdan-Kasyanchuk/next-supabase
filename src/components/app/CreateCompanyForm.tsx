import Form from 'next/form';
import Image from 'next/image';

import { createCompany } from '@/app/admin/companies/company-new/actions';
import { categories, countries, statuses } from '@/mock/data';
import { randomImage } from '@/mock/randomImage';

import SubmitButton from './SubmitButton';
import DatePicker from '../ui/inputs/DatePicker';
import Input from '../ui/inputs/Input';
import Select from '../ui/inputs/Select';
import TextArea from '../ui/inputs/TextArea';

export default function CreateCompanyForm() {
    const logo = randomImage(200, 200);

    return (
        <Form
            action={ createCompany }
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

                        <input
                            id="logo"
                            type="text"
                            name="logo_url"
                            defaultValue={ logo }
                            className="hidden"
                        />
                    </div>

                    <Input
                        type="text"
                        name="name"
                        label="Name"
                        placeholder="Name"
                        autoComplete="off"
                        required
                    />

                    <Select
                        name="status"
                        label="Status"
                        placeholder="Select status"
                        options={ statuses }
                        required
                    />

                    <Select
                        name="country"
                        label="Country"
                        placeholder="Select country"
                        options={ countries }
                        required
                    />
                </div>

                <div className="c-company-form-block__inner md:ps-2.5">
                    <Select
                        name="category"
                        label="Category"
                        placeholder="Select category"
                        options={ categories }
                        required
                    />
                    
                    <Input
                        type="number"
                        name="income"
                        label="Income"
                        placeholder="Income"
                        min={ 0 }
                    />

                    <Input
                        type="number"
                        name="sold"
                        label="Sold"
                        placeholder="Sold"
                        min={ 0 }
                    />

                    <DatePicker
                        name="joined_at"
                        label="Joined date"
                        placeholder="DD.MM.YYYY"
                    />

                    <TextArea
                        name="description"
                        label="Description"
                        placeholder="Description"
                    />
                </div>
            </div>

            <SubmitButton>
                Create company
            </SubmitButton>
        </Form>
    );
}