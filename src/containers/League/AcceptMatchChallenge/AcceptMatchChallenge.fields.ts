import { IFormFields } from '../../../@types/forms';
import { isRequired } from '../../../utils/validations/validations';

export interface IFormData {
  opponentMapId: string;
}

export const fields: IFormFields<IFormData> = {
  opponentMapId: {
    name: 'opponentMapId',
    required: true,
    rules: [isRequired],
  },
};
