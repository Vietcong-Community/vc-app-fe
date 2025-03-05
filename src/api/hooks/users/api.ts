import { useQuery } from '@tanstack/react-query';

import { get } from '../../apiFactory';
import { STALE_TIME } from '../../constants';
import { IUser } from '../interfaces';
import { IMeTeams } from '../teams/interfaces';

import { UsersEndpoints } from './endpoints';

export const useUserDetail = (id: string) => {
  return useQuery({
    queryKey: ['userDetail', id],
    queryFn: async () => {
      const { data } = await get<IUser>(UsersEndpoints.USER_BY_ID, { id });
      return data;
    },
    staleTime: STALE_TIME,
  });
};

export const useUserTeams = (id: string, refetchOnMount?: boolean | 'always') => {
  return useQuery({
    queryKey: ['userTeams', id],
    queryFn: async () => {
      const { data } = await get<{ items: IMeTeams[] }>(UsersEndpoints.USER_TEAMS, { id }, undefined);
      return data;
    },
    staleTime: Infinity,
    refetchOnMount: refetchOnMount ?? 'always',
  });
};

export const useUserMatches = (enabled = true) => {
  return useQuery({
    queryKey: ['userMatches'],
    queryFn: async () => {
      const { data } = await get<{ items: IMeTeams[]; total: number }>(UsersEndpoints.MY_MATCHES);
      return data;
    },
    staleTime: 0,
    enabled,
  });
};
