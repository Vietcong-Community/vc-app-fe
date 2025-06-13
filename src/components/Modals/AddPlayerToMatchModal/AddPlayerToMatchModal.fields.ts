import { IFormFields } from '../../../@types/forms';

export interface IFormData {
  challengerUserIds?: string[];
  opponentUserIds?: string[];
  teamIdForHostPlayers?: string;
  hostPlayer: string;
}

export const fields: IFormFields<IFormData> = {
  challengerUserIds: {
    name: 'challengerUserIds',
  },
  opponentUserIds: {
    name: 'opponentUserIds',
  },
  teamIdForHostPlayers: {
    name: 'teamIdForHostPlayers',
  },
  hostPlayer: {
    name: 'hostPlayer',
  },
};
