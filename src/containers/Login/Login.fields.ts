import { IFormFields } from '../../@types/forms';
import { isRequired } from '../../utils/validations/validations';

export interface IFormData {
  username: string;
  password: string;
}

export const fields: IFormFields<IFormData> = {
  username: {
    name: 'username',
    required: true,
    rules: [isRequired],
  },
  password: {
    name: 'password',
    required: true,
    rules: [isRequired],
  },
};
