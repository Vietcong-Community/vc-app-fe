import { IFormFields } from '../../../../../@types/forms';

export interface IFormData {
  maps: string[];
}

export const fields: IFormFields<IFormData> = {
  maps: {
    name: 'maps',
  },
};
