import { IFormFields } from '../../../@types/forms';
import { isRequired } from '../../../utils/validations/validations';

export interface IFormData {
  name: string;
  official: boolean;
}

export const fields: IFormFields<IFormData> = {
  name: {
    name: 'name',
    required: true,
    rules: [isRequired],
  },
  official: {
    name: 'official',
  },
};
