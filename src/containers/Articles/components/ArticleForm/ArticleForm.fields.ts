import { IFormFields } from '../../../../@types/forms';
import { isRequired, maxLength } from '../../../../utils/validations/validations';

export interface IFormData {
  title: string;
  perex: string;
  categoryId: string;
}

export const fields: IFormFields<IFormData> = {
  title: {
    name: 'title',
    required: true,
    rules: [isRequired, maxLength(80)],
  },
  perex: {
    name: 'perex',
    required: true,
    rules: [isRequired, maxLength(512)],
  },
  categoryId: {
    name: 'categoryId',
    required: true,
    rules: [isRequired],
  },
};
