import { IFormFields } from '../../../../../@types/forms';
import { Nation } from '../../../../../constants/enums';
import { isRequired } from '../../../../../utils/validations/validations';

export interface IFormData {
  mapId: string;
  roundNumber: number;
  scoreChallenger: number;
  scoreOpponent: number;
  challengerNation: Nation;
}

export const fields: IFormFields<IFormData> = {
  mapId: {
    name: 'mapId',
    required: true,
    rules: [isRequired],
  },
  roundNumber: {
    name: 'roundNumber',
    required: true,
    rules: [isRequired],
  },
  scoreChallenger: {
    name: 'scoreChallenger',
    required: true,
    rules: [isRequired],
  },
  scoreOpponent: {
    name: 'scoreOpponent',
    required: true,
    rules: [isRequired],
  },
  challengerNation: {
    name: 'challengerNation',
    required: true,
    rules: [isRequired],
  },
};
