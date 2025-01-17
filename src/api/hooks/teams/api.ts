import { useQuery } from '@tanstack/react-query';

import { get } from '../../apiFactory';

import { TeamEndpoints } from './endpoints';
import { ITeamPlayers, ITeam } from './interfaces';

export const useTeamDetail = (id: string, refetchOnMount?: boolean | 'always') => {
  return useQuery({
    queryKey: ['team', id],
    queryFn: async () => {
      const { data } = await get<ITeam>(TeamEndpoints.TEAM_BY_ID, { id });
      return data;
    },
    staleTime: Infinity,
    refetchOnMount: refetchOnMount ?? 'always',
  });
};

export const useTeamPlayers = (id: string, refetchOnMount?: boolean | 'always') => {
  return useQuery({
    queryKey: ['teamPlayers', id],
    queryFn: async () => {
      const { data } = await get<ITeamPlayers[]>(TeamEndpoints.TEAM_PLAYERS, { id });
      return data;
    },
    staleTime: Infinity,
    refetchOnMount: refetchOnMount ?? 'always',
  });
};
