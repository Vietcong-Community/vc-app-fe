import { IFormFields } from '../../../@types/forms';
import { isRequired, maxLength } from '../../../utils/validations/validations';

export interface IFormData {
  comment: string;
}

export const fields: IFormFields<IFormData> = {
  comment: {
    name: 'comment',
    required: true,
    rules: [isRequired, maxLength(500)],
  },
};
