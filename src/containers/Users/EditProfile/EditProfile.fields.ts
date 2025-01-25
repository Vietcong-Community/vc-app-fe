import { IFormFields } from '../../../@types/forms';
import { isEmailValid, isRequired, maxLength, minLength } from '../../../utils/validations/validations';

export interface IFormData {
  avatar?: File | null;
  firstName?: string;
  lastName?: string;
  nickname: string;
  email: string;
  facebookLink?: string;
  twitchLink?: string;
  steamLink?: string;
  description?: string;
}

export const fields: IFormFields<IFormData> = {
  avatar: {
    name: 'avatar',
  },
  firstName: {
    name: 'firstName',
    required: false,
    rules: [maxLength(30)],
  },
  lastName: {
    name: 'lastName',
    required: false,
    rules: [maxLength(30)],
  },
  nickname: {
    name: 'nickname',
    required: false,
    rules: [isRequired, minLength(3), maxLength(30)],
  },
  email: {
    name: 'email',
    required: true,
    rules: [isRequired, isEmailValid, maxLength(30)],
  },
  facebookLink: {
    name: 'facebookLink',
    required: false,
  },
  twitchLink: {
    name: 'twitchLink',
    required: false,
  },
  steamLink: {
    name: 'steamLink',
    required: false,
  },
  description: {
    name: 'description',
    required: false,
  },
};
