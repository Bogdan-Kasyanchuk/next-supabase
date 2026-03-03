import { ComboboxData, Select as MantineSelect } from '@mantine/core';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

type Props = {
    options: ComboboxData,
    name?: string,  
    value?: string | null,
    defaultValue?: string | null,
    id?: string,
    label?: string,
    placeholder?: string,
    error?: string,
    classNames?: {
        group?: string,
        label?: string,
        field?: string,
        wrapper?: string,
        section?: string,
        error?: string
    },
    required?: boolean,
    disabled?: boolean,
    onChange?: (value: string | null) => void
};

export default function Select(props: Props) {
    return (
        <MantineSelect
            id={ props.id }
            name={ props.name }
            comboboxProps={ { withinPortal: false } }
            data={ props.options }
            value={ props.value }
            defaultValue={ props.defaultValue }
            label={ props.label }
            placeholder={ props.placeholder }
            error={ props.error }
            nothingFoundMessage="Nothing found"
            autoComplete="off"
            rightSection={
                props.required || !props.value
                    ? <ChevronDown />
                    : <></>
            }
            clearButtonProps={
                {
                    'aria-label': 'Clear'
                }
            }
            classNames={
                {
                    root: clsx([
                        'f-group',
                        props.classNames?.group,
                        {
                            'f-group--disabled': props.disabled
                        }
                    ]),
                    label: clsx('f-label', props.classNames?.label),
                    input: clsx([
                        'f-select',
                        props.classNames?.field,
                        {
                            'f-select--error': props.error
                        }
                    ]),
                    wrapper: clsx('f-select__wrapper', props.classNames?.wrapper),
                    section: clsx('f-select__section', props.classNames?.section),
                    error: clsx('f-error', props.classNames?.error),
                    required: 'f-label__asterix'
                }
            }
            searchable
            disabled={ props.disabled }
            required={ props.required }
            withScrollArea={ false }
            clearable={ !props.required }
            withCheckIcon={ false }
            onChange={ props.onChange }
        />
    );
}
