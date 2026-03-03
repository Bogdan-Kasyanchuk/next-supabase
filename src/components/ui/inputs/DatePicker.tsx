import { DateInput, DateValue } from '@mantine/dates';
import clsx from 'clsx';
import { CalendarDays } from 'lucide-react';

type Props = {
    value?: DateValue,
    defaultValue?: DateValue,
    minDate?: string | Date,
    name?: string,
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

export default function DatePicker(props: Props) {
    return (
        <DateInput
            name={ props.name }
            locale="en"
            valueFormat="DD.MM.YYYY"
            monthLabelFormat="MMMM YYYY"
            weekdayFormat="ddd"
            defaultValue={ props.defaultValue }
            value={ props.value }
            label={ props.label }
            placeholder={ props.placeholder }
            minDate={ props.minDate }
            error={ props.error }
            popoverProps={
                {
                    withinPortal: false,
                    classNames: {
                        dropdown: 'f-date-picker__dropdown'
                    }
                }
            }
            leftSection={ <CalendarDays /> }
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
                        'f-date-picker',
                        props.classNames?.field,
                        {
                            'f-date-picker--error': props.error
                        }
                    ]),
                    wrapper: clsx('f-date-picker__wrapper', props.classNames?.wrapper),
                    section: clsx('f-date-picker__section', props.classNames?.section),
                    error: clsx('f-error', props.classNames?.error),
                    required: 'f-label__asterix',
                    calendarHeader: 'f-date-picker__dropdown-header',
                    calendarHeaderControl: 'f-date-picker__dropdown-header-control',
                    calendarHeaderLevel: 'f-date-picker__dropdown-header-level',
                    weekday: 'f-date-picker__dropdown-weekday',
                    day: 'f-date-picker__dropdown-day',
                    monthsList: 'f-date-picker__dropdown-months-list',
                    monthsListCell: 'f-date-picker__dropdown-months-list-cell',
                    monthCell: 'f-date-picker__dropdown-month-cell',
                    yearsList: 'f-date-picker__dropdown-years-list',
                    yearsListCell: 'f-date-picker__dropdown-years-list-cell'
                }
            }
            clearable
            fixOnBlur
            disabled={ props.disabled }
            required={ props.required }
            onChange={ props.onChange }
        />
    );
}