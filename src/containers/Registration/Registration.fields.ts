import { IFormFields } from '../../@types/forms';
import { isRequired } from '../../utils/validations/validations';

export interface IFormData {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const fields: IFormFields<IFormData> = {
  name: {
    name: 'name',
    required: false,
  },
  surname: {
    name: 'surname',
    required: false,
  },
  username: {
    name: 'username',
    required: true,
    rules: [isRequired],
  },
  email: {
    name: 'email',
    required: true,
    rules: [isRequired],
  },
  password: {
    name: 'password',
    required: true,
    rules: [isRequired],
  },
  passwordConfirm: {
    name: 'passwordConfirm',
    required: true,
    rules: [isRequired],
  },
};
