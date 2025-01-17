import { IFormFields } from '../../../@types/forms';
import { isEmailValid, isRequired } from '../../../utils/validations/validations';

export interface IFormData {
  email: string;
  password: string;
}

export const fields: IFormFields<IFormData> = {
  email: {
    name: 'email',
    required: true,
    rules: [isRequired, isEmailValid],
  },
  password: {
    name: 'password',
    required: true,
    rules: [isRequired],
  },
};
