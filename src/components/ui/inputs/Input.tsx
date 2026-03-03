import clsx from 'clsx';
import { ComponentPropsWithoutRef, ReactNode, useId } from 'react';

type Props = Omit<ComponentPropsWithoutRef<'input'>, 'className'> & {
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
    const { startSection, endSection, label, error, classNames, ...rest } = props;
    
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
                        <span className="f-label__asterix">&nbsp;*</span>
                    }
                </label>
            }

            <div className={ clsx('f-field__wrapper', classNames?.wrapper ) }>
                {
                    startSection &&
                    <div className={ clsx('f-field__section', classNames?.section) }>
                        { startSection }
                    </div>
                }

                <input
                    { ...rest }
                    id={ props.id || defaultId }
                    className={
                        clsx([
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
                    <div className={ clsx('f-field__section', classNames?.section) }>
                        { endSection }
                    </div>
                }
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
