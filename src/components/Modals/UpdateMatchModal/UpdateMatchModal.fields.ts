import { IFormFields } from '../../../@types/forms';
import { isRequired } from '../../../utils/validations/validations';

export interface IFormData {
  challengerMapId: string;
  opponentMapId?: string;
  startDate: string;
  challengerScore?: number;
  opponentScore?: number;
}

export const fields: IFormFields<IFormData> = {
  challengerMapId: {
    name: 'challengerMapId',
    required: true,
    rules: [isRequired],
  },
  opponentMapId: {
    name: 'opponentMapId',
    required: true,
    rules: [isRequired],
  },
  startDate: {
    name: 'startDate',
    required: true,
    rules: [isRequired],
  },
  challengerScore: {
    name: 'challengerScore',
  },
  opponentScore: {
    name: 'opponentScore',
  },
};
