import { IFormFields } from '../../../../../@types/forms';
import { MatchStatus } from '../../../../../constants/enums';
import { isRequired } from '../../../../../utils/validations/validations';

export interface IFormData {
  status: MatchStatus;
}

export const fields: IFormFields<IFormData> = {
  status: {
    name: 'status',
    required: true,
    rules: [isRequired],
  },
};
