import { ComponentPropsWithoutRef, useId } from 'react';

import cn from '@/utils/cn';

type Props = Omit<ComponentPropsWithoutRef<'textarea'>, 'className'> & {
    label?: string,
    error?: string,
    classNames?: {
        group?: string,
        wrapper?: string,
        label?: string,
        field?: string,
        error?: string
    }
};

export default function TextArea(props: Props) {
    const { label, error, classNames, ...rest } = props;

    const defaultId = useId();

    return (
        <div
            className={
                cn([
                    'f-group',
                    classNames?.group,
                    {
                        'f-group--disabled': props.disabled
                    }
                ])
            }
        >
            {
                label &&
                <label
                    htmlFor={ props.id || defaultId }
                    className={ cn('f-label', classNames?.label) }
                >
                    { label }
                    
                    { 
                        props.required &&
                        <span className="f-label__asterix">*</span>
                    }
                </label>
            }

            <div className={ cn('f-field__wrapper', classNames?.wrapper ) }>
                <textarea
                    { ...rest }
                    id={ props.id || defaultId }
                    value={ props.value }
                    className={
                        cn([
                            'f-field f-field--textarea',
                            {
                                'f-field--error': error
                            },
                            classNames?.field
                        ])
                    }
                    disabled={ props.disabled }
                />
            </div>

            {
                error &&
                <div className={ cn('f-error', classNames?.error) }>
                    { error }
                </div>
            }
        </div>
    );
}