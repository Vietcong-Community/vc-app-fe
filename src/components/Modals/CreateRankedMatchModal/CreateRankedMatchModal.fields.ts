import { IFormFields } from '../../../@types/forms';
import { isRequired } from '../../../utils/validations/validations';

export interface IFormData {
  maximalPlayers: number;
  firstMapId: string;
  secondMapId: string;
  startDate: string;
}

export const fields: IFormFields<IFormData> = {
  maximalPlayers: {
    name: 'maximalPlayers',
    required: true,
    rules: [isRequired],
  },
  firstMapId: {
    name: 'firstMapId',
    required: true,
    rules: [isRequired],
  },
  secondMapId: {
    name: 'secondMapId',
    required: true,
    rules: [isRequired],
  },
  startDate: {
    name: 'startDate',
    required: true,
    rules: [isRequired],
  },
};
