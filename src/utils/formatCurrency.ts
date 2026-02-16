import { CONSTANTS } from '../datasets/constants';

export default (value: number, options?: Intl.NumberFormatOptions) =>
    new Intl.NumberFormat(CONSTANTS.LOCALE.code, options).format(value);