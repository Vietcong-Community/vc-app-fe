import { Dayjs } from 'dayjs';

import { IFormFields } from '../../../@types/forms';
import { isRequired } from '../../../utils/validations/validations';

export interface IFormData {
  name: string;
  startDate?: Dayjs;
  endDate?: Dayjs;
}

export const fields: IFormFields<IFormData> = {
  name: {
    name: 'name',
    required: true,
    rules: [isRequired],
  },
  startDate: {
    name: 'startDate',
  },
  endDate: {
    name: 'endDate',
  },
};
