import { IFormFields } from '../../../../../@types/forms';
import { PlayersCount } from '../../../../../constants/enums';
import { isRequired } from '../../../../../utils/validations/validations';

export interface IFormData {
  numberOfPlayers?: PlayersCount;
  players: string[];
  firstMapId: string;
  secondMapId: string;
}

export const fields: IFormFields<IFormData> = {
  numberOfPlayers: {
    name: 'numberOfPlayers',
    rules: [isRequired],
  },
  firstMapId: {
    name: 'firstMapId',
    rules: [isRequired],
  },
  secondMapId: {
    name: 'secondMapId',
    rules: [isRequired],
  },
  players: {
    name: 'players',
  },
};
