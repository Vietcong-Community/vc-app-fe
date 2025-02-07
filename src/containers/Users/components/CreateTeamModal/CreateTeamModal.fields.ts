import { IFormFields } from '../../../../@types/forms';
import { isRequired, maxLength } from '../../../../utils/validations/validations';

export interface IFormData {
  name: string;
  tag: string;
}

export const fields: IFormFields<IFormData> = {
  name: {
    name: 'name',
    required: true,
    rules: [isRequired, maxLength(50)],
  },
  tag: {
    name: 'tag',
    required: true,
    rules: [isRequired, maxLength(20)],
  },
};
