import { Nation } from '../../../../../constants/enums';

export interface IFormData {
  rounds: {
    id: number;
    players: {
      userId: string;
      flags: number;
      kills: number;
      deaths: number;
      nation: Nation;
    }[];
  }[];
}
