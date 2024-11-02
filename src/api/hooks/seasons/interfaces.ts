import { SeasonStatus } from '../../../containers/MixedLeague/enums';

export interface ISeason {
  id: string;
  name: string;
  status: SeasonStatus;
  startDate?: string;
  endDate?: string;
}

export interface ISaveSeason {
  name: string;
  startDate?: string;
  endDate?: string;
}
