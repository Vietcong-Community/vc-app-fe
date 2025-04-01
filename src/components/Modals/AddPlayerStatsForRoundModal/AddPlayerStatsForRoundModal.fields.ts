import { IFormFields } from '../../../@types/forms';
import { Nation } from '../../../constants/enums';
import { isRequired, minValue } from '../../../utils/validations/validations';

export interface IFormData {
  nation: Nation;
  flags: number;
  kills: number;
  deaths: number;
  playerInMatchId: string;
}

export const fields: IFormFields<IFormData> = {
  nation: {
    name: 'nation',
    required: true,
    rules: [isRequired],
  },
  flags: {
    name: 'flags',
    required: true,
    rules: [isRequired, minValue(0)],
  },
  kills: {
    name: 'kills',
    required: true,
    rules: [isRequired, minValue(0)],
  },
  deaths: {
    name: 'deaths',
    required: true,
    rules: [isRequired, minValue(0)],
  },
  playerInMatchId: {
    name: 'playerInMatchId',
    required: true,
    rules: [isRequired],
  },
};
