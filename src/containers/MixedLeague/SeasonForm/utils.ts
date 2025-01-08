import { ISaveSeason } from '../../../api/hooks/mixedLeague/interfaces';
import { formatDateForSystem } from '../../../utils/dateUtils';

import { IFormData } from './Season.fields';

export const transformSubmitValues = (values: IFormData): ISaveSeason => {
  return {
    name: values.name,
    startDate: formatDateForSystem(values.startDate),
    endDate: formatDateForSystem(values.endDate),
  };
};
