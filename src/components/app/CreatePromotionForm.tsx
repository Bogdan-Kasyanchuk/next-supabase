import Form from 'next/form';
import Image from 'next/image';

import { createPromotion } from '@/app/admin/companies/[id]/promotion-new/actions';
import { randomImage } from '@/mock/randomImage';

import SubmitButton from './SubmitButton';
import DatePicker from '../ui/inputs/DatePicker';
import Input from '../ui/inputs/Input';
import TextArea from '../ui/inputs/TextArea';

type Props = {
    companyId: string
};

export default function CreatePromotionForm(props: Props) {
    const cover = randomImage(400, 200);

    const createPromotionWithCompanyId = createPromotion.bind(null, props.companyId);

    return (
        <Form
            action={ createPromotionWithCompanyId }
            className="c-promotion-form-block"
        >
            <div className="c-promotion-form-block__form">
                <div className="c-promotion-form-block__inner md:pe-2.5">
                    <div>
                        <label
                            className="f-label"
                            htmlFor="logo"
                        >
                            Cover
                            <span className="f-label__asterix">&nbsp;*</span>
                        </label>

                        <div className="h-[200px] relative">
                            <Image
                                fill
                                src={ cover }
                                alt="Image"
                            />
                        </div>

                        <input
                            id="logo"
                            type="text"
                            name="cover_url"
                            defaultValue={ cover }
                            className="hidden"
                        />
                    </div>

                    <Input
                        type="text"
                        name="name"
                        label="Name"
                        placeholder="Name"
                        autoComplete="off"
                        minLength={ 3 }
                        required
                    />

                    <Input
                        type="number"
                        name="discount"
                        label="Discount"
                        placeholder="Discount"
                        min={ 0 }
                        max={ 100 }
                        required
                    />
                </div>

                <div className="c-promotion-form-block__inner md:ps-2.5">
                    <DatePicker
                        name="start_at"
                        label="Start date"
                        placeholder="DD.MM.YYYY"
                        minDate={ new Date() }
                    />

                    <DatePicker
                        name="end_at"
                        label="End date"
                        placeholder="DD.MM.YYYY"
                        minDate={ new Date() }
                        required
                    />

                    <TextArea
                        name="description"
                        label="Description"
                        placeholder="Description"
                        classNames={
                            {
                                field: 'md:h-[200px]'
                            }
                        }
                        minLength={ 3 }
                        required
                    />
                </div>
            </div>

            <SubmitButton>
                Create promotion
            </SubmitButton>
        </Form>
    );
}