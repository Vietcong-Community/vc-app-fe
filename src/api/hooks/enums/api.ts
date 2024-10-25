import { useQuery } from '@tanstack/react-query';

import { get } from '../../apiFactory';

import { EnumsEndpoints } from './endpoints';
import { IMap } from './interfaces';

export const useMaps = () => {
  return useQuery({
    queryKey: ['maps'],
    queryFn: async () => {
      const { data } = await get<IMap[]>(EnumsEndpoints.MAPS);
      return data;
    },
    staleTime: Infinity,
  });
};
