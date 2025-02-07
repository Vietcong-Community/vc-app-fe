import { IFormFields } from '../../../../../@types/forms';
import { TeamRole } from '../../../../../constants/enums';
import { isRequired } from '../../../../../utils/validations/validations';

export interface IFormData {
  role: TeamRole;
}

export const fields: IFormFields<IFormData> = {
  role: {
    name: 'role',
    required: true,
    rules: [isRequired],
  },
};
