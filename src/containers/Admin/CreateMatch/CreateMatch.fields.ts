import { IFormFields } from '../../../@types/forms';
import { isRequired } from '../../../utils/validations/validations';

export interface IFormData {
  challengerId: string;
  opponentId: string;
  challengerMapId: string;
  opponentMapId: string;
  startDate: string;
}

export const fields: IFormFields<IFormData> = {
  challengerId: {
    name: 'challengerId',
    required: true,
    rules: [isRequired],
  },
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
};
