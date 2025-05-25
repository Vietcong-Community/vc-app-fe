import { IFormFields } from '../../../@types/forms';
import { isRequired } from '../../../utils/validations/validations';

export interface IFormData {
  firstMapId: string;
  secondMapId: string;
}

export const fields: IFormFields<IFormData> = {
  firstMapId: {
    name: 'firstMapId',
    required: true,
    rules: [isRequired],
  },
  secondMapId: {
    name: 'secondMapId',
    required: true,
    rules: [isRequired],
  },
};
