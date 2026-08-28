import Form from 'next/form';
import Image from 'next/image';

import { createPromotionAction, updatePromotionAction } from '@/actions/promotions';
import DatePicker from '@/components/ui/inputs/DatePicker';
import Input from '@/components/ui/inputs/Input';
import TextArea from '@/components/ui/inputs/TextArea';
import { randomImage } from '@/mock/randomImage';
import { PromotionDetailsMapper } from '@/types';

import SubmitButton from './SubmitButton';

type Props =
    | { mode: 'create', companyId: string }
    | { mode: 'update', id: string, initialValues: PromotionDetailsMapper };

export default async function PromotionForm(props: Props) {
    const action = props.mode === 'create'
        ? createPromotionAction.bind(null, props.companyId)
        : updatePromotionAction.bind(null, props.id);

    const cover = props.mode === 'create' ? randomImage(400, 200) : props.initialValues.cover_url;
    const initialValues = props.mode === 'update' ? props.initialValues : undefined;

    return (
        <Form
            action={ action }
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
                                src={ cover }
                                alt="Image"
                                sizes="690px"
                                fill
                            />
                        </div>

                        {
                            props.mode === 'create' &&
                            <input
                                id="logo"
                                type="text"
                                name="cover_url"
                                defaultValue={ cover }
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

                    <Input
                        type="number"
                        name="discount"
                        label="Discount"
                        placeholder="Discount"
                        defaultValue={ initialValues?.discount }
                        min={ 1 }
                        max={ 99 }
                        required
                    />
                </div>

                <div className="c-promotion-form-block__inner md:ps-2.5">
                    <DatePicker
                        name="start_at"
                        label="Start date"
                        placeholder="DD.MM.YYYY"
                        defaultValue={ initialValues?.start_at }
                        minDate={ new Date() }
                    />

                    <DatePicker
                        name="end_at"
                        label="End date"
                        placeholder="DD.MM.YYYY"
                        defaultValue={ initialValues?.end_at }
                        minDate={ new Date() }
                        required
                    />

                    <TextArea
                        name="description"
                        label="Description"
                        placeholder="Description"
                        defaultValue={ initialValues?.description }
                        classNames={
                            {
                                field: 'md:h-[200px]'
                            }
                        }
                        required
                    />
                </div>
            </div>

            <SubmitButton>
                { props.mode === 'create' ? 'Create promotion' : 'Update promotion' }
            </SubmitButton>
        </Form>
    );
}
