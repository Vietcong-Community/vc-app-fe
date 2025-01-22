import { IFormFields } from '../../../@types/forms';
import { isRequired, maxValue, minValue } from '../../../utils/validations/validations';

export interface IRoundFormPart {
  mapId: string;
  scoreChallenger: number;
  scoreOpponent: number;
}

export interface IFormData {
  rounds: IRoundFormPart[];
}

export const fields: IFormFields<IFormData> = {
  rounds: {
    name: 'rounds',
  },
};

export const roundFields: IFormFields<IRoundFormPart> = {
  mapId: {
    name: 'mapId',
  },
  scoreChallenger: {
    name: 'scoreChallenger',
    required: true,
    rules: [isRequired, minValue(0), maxValue(100)],
  },
  scoreOpponent: {
    name: 'scoreOpponent',
    required: true,
    rules: [isRequired, minValue(0), maxValue(100)],
  },
};
