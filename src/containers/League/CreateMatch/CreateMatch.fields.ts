import { IFormFields } from '../../../@types/forms';
import { isRequired } from '../../../utils/validations/validations';

export interface IFormData {
  opponentId: string;
  challengerMapId: string;
  startDate: string;
}

export const fields: IFormFields<IFormData> = {
  opponentId: {
    name: 'opponentId',
    required: true,
    rules: [isRequired],
  },
  challengerMapId: {
    name: 'challengerMapId',
    required: true,
    rules: [isRequired],
  },
  startDate: {
    name: 'startDate',
    required: true,
    rules: [isRequired],
  },
};
