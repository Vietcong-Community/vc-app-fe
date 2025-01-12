import { useQuery } from '@tanstack/react-query';

import { get } from '../../../apiFactory';
import { IMatch, ISeason } from '../interfaces';

import { SeasonsEndpoints } from './endpoints';

export const useSeasons = () => {
  return useQuery({
    queryKey: ['seasons'],
    queryFn: async () => {
      const { data } = await get<ISeason[]>(SeasonsEndpoints.SEASONS);
      return data;
    },
    staleTime: Infinity,
  });
};

export const useSeasonDetail = (id: string, refetchOnMount?: boolean | 'always') => {
  return useQuery({
    queryKey: ['season', id],
    queryFn: async () => {
      const { data } = await get<ISeason>(SeasonsEndpoints.SEASON_BY_ID, { id });
      return data;
    },
    staleTime: Infinity,
    refetchOnMount: refetchOnMount ?? 'always',
  });
};

export const useMatchesBySeason = (id: string, refetchOnMount?: boolean | 'always', enabled = true) => {
  return useQuery({
    queryKey: ['matchesBySeason', id],
    queryFn: async () => {
      const { data } = await get<IMatch[]>(SeasonsEndpoints.MATCHES_BY_SEASON, { id });
      return data;
    },
    enabled,
    staleTime: Infinity,
    refetchOnMount: refetchOnMount ?? 'always',
  });
};
