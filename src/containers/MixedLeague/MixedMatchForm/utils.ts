import dayjs from 'dayjs';
import { uniqBy } from 'lodash';

import { IMixedMatch, ISaveMixedMatch } from '../../../api/hooks/mixedLeague/interfaces';
import { formatDateForSystem } from '../../../utils/dateUtils';

import { IFormData } from './MixedMatch.fields';

export const transformSubmitValues = (values: IFormData): ISaveMixedMatch => {
  return {
    ...values,
    date: formatDateForSystem(values.date)!,
  };
};

export const transformInitialValues = (match?: IMixedMatch): Partial<IFormData> => {
  const maps = uniqBy(
    match?.rounds?.map((item) => item.map).filter((item) => !!item.name),
    'name',
  );

  return {
    date: match?.date ? dayjs(match?.date) : undefined,
    firstCaptainId: match?.firstCaptain?.id,
    secondCaptainId: match?.secondCaptain?.id,
    firstMapId: maps?.[0]?.id,
    secondMapId: maps?.[1]?.id,
  };
};
