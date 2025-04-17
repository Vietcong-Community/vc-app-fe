import { IFormFields } from '../../../@types/forms';

export interface IFormData {
  players?: string;
  teams?: string[];
}

export const fields: IFormFields<IFormData> = {
  players: {
    name: 'players',
  },
  teams: {
    name: 'teams',
  },
};
