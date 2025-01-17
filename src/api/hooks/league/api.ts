import { useQuery } from '@tanstack/react-query';

import { get } from '../../apiFactory';
import { IMap } from '../interfaces';

import { LeagueEndpoints } from './endpoints';
import { ILeagueDetail, ISeason } from './interfaces';

export const useLeagueDetail = (id: string, refetchOnMount?: boolean | 'always') => {
  return useQuery({
    queryKey: ['league', id],
    queryFn: async () => {
      const { data } = await get<ILeagueDetail>(LeagueEndpoints.LEAGUE_BY_ID, { id });
      return data;
    },
    staleTime: Infinity,
    refetchOnMount: refetchOnMount ?? 'always',
  });
};

export const useSeasonsInLeague = (id: string, refetchOnMount?: boolean | 'always') => {
  return useQuery({
    queryKey: ['seasonsByLeague', id],
    queryFn: async () => {
      const { data } = await get<ISeason[]>(LeagueEndpoints.LEAGUE_SEASONS, { id });
      return data;
    },
    staleTime: Infinity,
    refetchOnMount: refetchOnMount ?? 'always',
  });
};

export const useSeasonsDetail = (leagueId: string, seasonId: string, refetchOnMount?: boolean | 'always') => {
  return useQuery({
    queryKey: ['seasonDetail', leagueId, seasonId],
    queryFn: async () => {
      const { data } = await get<ISeason>(LeagueEndpoints.SEASON_DETAIL, { leagueId, seasonId });
      return data;
    },
    staleTime: Infinity,
    refetchOnMount: refetchOnMount ?? 'always',
  });
};

export const useMapsInSeason = (leagueId: string, seasonId: string) => {
  return useQuery({
    queryKey: ['mapsInSeason', leagueId, seasonId],
    queryFn: async () => {
      const { data } = await get<IMap[]>(LeagueEndpoints.MAPS_IN_SEASON, { leagueId, seasonId });
      return data;
    },
    staleTime: Infinity,
  });
};
