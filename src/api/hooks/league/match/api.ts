import { useQuery } from '@tanstack/react-query';

import { get } from '../../../apiFactory';
import { IMatch } from '../interfaces';

import { MatchEndpoints } from './endpoints';

export const useMatchById = (id: string, refetchOnMount?: boolean | 'always') => {
  return useQuery({
    queryKey: ['matchesById', id],
    queryFn: async () => {
      const { data } = await get<IMatch>(MatchEndpoints.MATCH_BY_ID, { id });
      return data;
    },
    staleTime: Infinity,
    refetchOnMount: refetchOnMount ?? 'always',
  });
};
