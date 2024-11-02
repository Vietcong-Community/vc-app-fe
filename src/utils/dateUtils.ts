import { Dayjs } from 'dayjs';

import { DEFAULT_SYSTEM_DATE_FORMAT } from '../components/Fields/DatePickerField/DatePickerField';

export const formatDateForSystem = (value?: Dayjs): string | undefined => {
  if (!value) {
    return undefined;
  }

  return value.format(DEFAULT_SYSTEM_DATE_FORMAT);
};
