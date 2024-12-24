import { IFormFields } from '../../@types/forms';
import { isRequired } from '../../utils/validations/validations';

export interface IFormData {
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const fields: IFormFields<IFormData> = {
  firstName: {
    name: 'firstName',
    required: false,
  },
  lastName: {
    name: 'lastName',
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
