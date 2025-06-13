import { IFormFields } from '../../../@types/forms';
import { isRequired } from '../../../utils/validations/validations';

export interface IFormData {
  playerId: string;
}

export const fields: IFormFields<IFormData> = {
  playerId: {
    name: 'playerId',
    required: true,
    rules: [isRequired],
  },
};
