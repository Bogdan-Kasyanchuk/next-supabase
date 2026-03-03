import clsx from 'clsx';
import { ComponentPropsWithoutRef, useId } from 'react';

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
                clsx([
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
                    className={ clsx('f-label', classNames?.label) }
                >
                    { label }
                    
                    { 
                        props.required &&
                        <span className="f-label__asterix">*</span>
                    }
                </label>
            }

            <div className={ clsx('f-field__wrapper', classNames?.wrapper ) }>
                <textarea
                    { ...rest }
                    id={ props.id || defaultId }
                    value={ props.value }
                    className={
                        clsx([
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
                <div className={ clsx('f-error', classNames?.error) }>
                    { error }
                </div>
            }
        </div>
    );
}