import { ComboboxData, Select as MantineSelect } from '@mantine/core';
import { ChevronDown } from 'lucide-react';

import cn from '@/utils/cn';

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
                    root: cn([
                        'f-group',
                        props.classNames?.group,
                        {
                            'f-group--disabled': props.disabled
                        }
                    ]),
                    label: cn('f-label', props.classNames?.label),
                    input: cn([
                        'f-select',
                        props.classNames?.field,
                        {
                            'f-select--error': props.error
                        }
                    ]),
                    wrapper: cn('f-select__wrapper', props.classNames?.wrapper),
                    section: cn('f-select__section', props.classNames?.section),
                    error: cn('f-error', props.classNames?.error),
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
