import Form from 'next/form';
import Image from 'next/image';

import { createPromotionAction } from '@/actions/promotions';
import DatePicker from '@/components/ui/inputs/DatePicker';
import Input from '@/components/ui/inputs/Input';
import TextArea from '@/components/ui/inputs/TextArea';
import { randomImage } from '@/mock/randomImage';

import SubmitButton from './SubmitButton';

type Props = {
    companyId: string
};

export default function CreatePromotionForm(props: Props) {
    const cover = randomImage(400, 200);

    const createPromotion = createPromotionAction.bind(null, props.companyId);

    return (
        <Form
            action={ createPromotion }
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