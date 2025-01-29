import dayjs, { Dayjs } from 'dayjs';

import {
  DEFAULT_SYSTEM_DATE_FORMAT,
  DEFAULT_USER_DATE_FORMAT,
} from '../components/Fields/DatePickerField/DatePickerField';

export const formatDateForSystem = (value?: Dayjs): string | undefined => {
  if (!value) {
    return undefined;
  }

  return value.format(DEFAULT_SYSTEM_DATE_FORMAT);
};

export const formatDateForUser = (value?: string, format = DEFAULT_USER_DATE_FORMAT): string | undefined => {
  if (!value) {
    return undefined;
  }

  return dayjs(value).format(format);
};
