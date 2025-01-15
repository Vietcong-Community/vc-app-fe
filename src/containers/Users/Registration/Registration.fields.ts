import { IFormFields } from '../../../@types/forms';
import {
  isEmailValid,
  isPasswordSame,
  isPasswordValid,
  isRequired,
  minLength,
} from '../../../utils/validations/validations';

export interface IFormData {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  agree: boolean;
}

export const fields: IFormFields<IFormData> = {
  nickname: {
    name: 'nickname',
    required: true,
    rules: [isRequired, minLength(3)],
  },
  email: {
    name: 'email',
    required: true,
    rules: [isRequired, isEmailValid],
  },
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
  agree: {
    name: 'agree',
    required: true,
    rules: [isRequired],
  },
};
