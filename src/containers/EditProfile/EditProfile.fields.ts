import { IFormFields } from '../../@types/forms';

export interface IFormData {
  firstName?: string;
  lastName?: string;
  username: string;
  facebookLink: string;
  twitchLink: string;
  steamName: string;
  originalTeam: string;
  favouriteTeam: string;
  description: string;
}

export const fields: IFormFields<IFormData> = {
  firstName: {
    name: 'firstName',
    required: false,
  },
  lastName: {
    name: 'lastName',
    required: false,
  },
  username: {
    name: 'username',
    required: false,
  },
  facebookLink: {
    name: 'facebookLink',
    required: false,
  },
  twitchLink: {
    name: 'twitchLink',
    required: false,
  },
  steamName: {
    name: 'steamName',
    required: false,
  },
  originalTeam: {
    name: 'originalTeam',
    required: false,
  },
  favouriteTeam: {
    name: 'favouriteTeam',
    required: false,
  },
  description: {
    name: 'description',
    required: false,
  },
};
