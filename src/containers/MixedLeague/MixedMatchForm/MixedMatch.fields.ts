import { Dayjs } from 'dayjs';

import { IFormFields } from '../../../@types/forms';
import { isRequired } from '../../../utils/validations/validations';

export interface IFormData {
  date?: Dayjs;
  firstCaptainId?: string;
  secondCaptainId?: string;
  firstMapId?: string;
  secondMapId?: string;
}

export const fields: IFormFields<IFormData> = {
  date: {
    name: 'date',
    required: true,
    rules: [isRequired],
  },
  firstCaptainId: {
    name: 'firstCaptainId',
    required: true,
    rules: [isRequired],
  },
  secondCaptainId: {
    name: 'secondCaptainId',
    required: true,
    rules: [isRequired],
  },
  firstMapId: {
    name: 'firstMapId',
  },
  secondMapId: {
    name: 'secondMapId',
  },
};
