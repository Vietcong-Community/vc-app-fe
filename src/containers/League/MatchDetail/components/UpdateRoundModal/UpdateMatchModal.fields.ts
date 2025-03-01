import { IFormFields } from '../../../../../@types/forms';
import { isRequired } from '../../../../../utils/validations/validations';

export interface IFormData {
  mapId: string;
  round: number;
  scoreChallenger: number;
  scoreOpponent: number;
}

export const fields: IFormFields<IFormData> = {
  mapId: {
    name: 'mapId',
    required: true,
    rules: [isRequired],
  },
  round: {
    name: 'round',
    required: true,
    rules: [isRequired],
  },
  scoreChallenger: {
    name: 'scoreChallenger',
  },
  scoreOpponent: {
    name: 'scoreOpponent',
  },
};
