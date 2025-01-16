import { IFormFields } from '../../../@types/forms';
import { isPasswordSame, isPasswordValid, isRequired } from '../../../utils/validations/validations';

export interface IFormData {
  password: string;
  passwordConfirm: string;
}

export const fields: IFormFields<IFormData> = {
  password: {
    name: 'password',
    required: true,
    rules: [isRequired, isPasswordValid],
  },
  passwordConfirm: {
    name: 'passwordConfirm',
    required: true,
    rules: [isRequired, isPasswordSame],
  },
};
