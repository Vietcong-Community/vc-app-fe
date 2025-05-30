import { IFormFields } from '../../../@types/forms';
import { MatchStatus } from '../../../constants/enums';

export interface IFormData {
  teamId?: string;
  startDateFrom?: string;
  startDateTo?: string;
  mapId?: string;
  status?: MatchStatus[];
}

export const fields: IFormFields<IFormData> = {
  teamId: {
    name: 'teamId',
  },
  startDateFrom: {
    name: 'startDateFrom',
  },
  startDateTo: {
    name: 'startDateTo',
  },
  mapId: {
    name: 'mapId',
  },
  status: {
    name: 'status',
  },
};
