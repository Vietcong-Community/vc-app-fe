import { IFormFields } from '../../../../../@types/forms';

export interface IFormData {
  challengerUserIds?: string[];
  opponentUserIds?: string[];
  hostPlayer: string;
}

export const fields: IFormFields<IFormData> = {
  challengerUserIds: {
    name: 'challengerUserIds',
  },
  opponentUserIds: {
    name: 'opponentUserIds',
  },
  hostPlayer: {
    name: 'hostPlayer',
  },
};
