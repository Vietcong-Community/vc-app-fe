import { IFormFields } from '../../../../../@types/forms';

export interface IFormData {
  teamId: string;
}

export const fields: IFormFields<IFormData> = {
  teamId: {
    name: 'teamId',
  },
};
