import { ComponentPropsWithoutRef, ReactNode, useId } from 'react';

import cn from '@/lib/utils';

type Props = Omit<ComponentPropsWithoutRef<'input'>, 'className'> & {
    slotAfter?: ReactNode,
    startSection?: ReactNode,
    endSection?: ReactNode,
    label?: string,
    error?: string,
    classNames?: {
        group?: string,
        wrapper?: string,
        label?: string,
        field?: string,
        section?: string,
        error?: string
    }
};

export default function Input(props: Props) {
    const { slotAfter, startSection, endSection, label, error, classNames, ...rest } = props;
    
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
                        <span className="f-label__asterix">&nbsp;*</span>
                    }
                </label>
            }

            <div className={ cn('f-field__wrapper', classNames?.wrapper ) }>
                {
                    startSection &&
                    <div className={ cn('f-field__section', classNames?.section) }>
                        { startSection }
                    </div>
                }

                <input
                    { ...rest }
                    id={ props.id || defaultId }
                    className={
                        cn([
                            'f-field f-field--input',
                            classNames?.field,
                            {
                                'f-field--error': error
                            }
                        ])
                    }
                    disabled={ props.disabled }
                />

                {
                    endSection &&
                    <div className={ cn('f-field__section', classNames?.section) }>
                        { endSection }
                    </div>
                }

                { slotAfter }
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
