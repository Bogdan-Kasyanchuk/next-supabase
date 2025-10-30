import Form from 'next/form';
import Image from 'next/image';

import { updatePromotion } from '@/app/admin/promotions/[id]/promotion-update/actions';
import { PromotionDetailsMapper } from '@/types';

import SubmitButton from './SubmitButton';
import DatePicker from '../ui/inputs/DatePicker';
import Input from '../ui/inputs/Input';
import TextArea from '../ui/inputs/TextArea';

type Props = {
    id: string,
    initialValues: PromotionDetailsMapper
};

export default function UpdatePromotionForm(props: Props) {
    const updatePromotionWithId = updatePromotion.bind(null, props.id);

    return (
        <Form
            action={ updatePromotionWithId }
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
                                src={ props.initialValues.cover_url }
                                alt="Image"
                                sizes="690px"
                                fill
                            />
                        </div>
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

                    <Input
                        type="number"
                        name="discount"
                        label="Discount"
                        placeholder="Discount"
                        defaultValue={ props.initialValues.discount }
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
                        defaultValue={ props.initialValues.start_at }
                        minDate={ new Date() }
                    />

                    <DatePicker
                        name="end_at"
                        label="End date"
                        placeholder="DD.MM.YYYY"
                        defaultValue={ props.initialValues.end_at }
                        minDate={ new Date() }
                    />

                    <TextArea
                        name="description"
                        label="Description"
                        placeholder="Description"
                        defaultValue={ props.initialValues.description }
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
                Update promotion
            </SubmitButton>
        </Form>
    );
}