import { IFormFields } from '../../../../../@types/forms';
import { isRequired } from '../../../../../utils/validations/validations';

export interface IFormData {
  roundStatsId: string;
}

export const fields: IFormFields<IFormData> = {
  roundStatsId: {
    name: 'roundStatsId',
    required: true,
    rules: [isRequired],
  },
};
