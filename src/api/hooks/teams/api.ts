import { useMutation, useQuery } from '@tanstack/react-query';

import { get, post } from '../../apiFactory';
import { IIdentifiedEntity } from '../interfaces';

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
      const { data } = await get<{ items: ITeamPlayers[] }>(TeamEndpoints.TEAM_PLAYERS, { id });
      return data;
    },
    staleTime: Infinity,
    refetchOnMount: refetchOnMount ?? 'always',
  });
};

export const useJoinTeam = (teamId: string) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await post<undefined, IIdentifiedEntity>(TeamEndpoints.REQUEST_TO_JOIN_TEAM, undefined, {
        teamId,
      });
      return data;
    },
  });
};

export const useApproveJoinRequest = (teamId: string) => {
  return useMutation({
    mutationFn: async (payload: { userId: string }) => {
      const { data } = await post<undefined, undefined>(TeamEndpoints.APPROVE_JOIN_REQUEST, undefined, {
        teamId,
        userId: payload.userId,
      });
      return data;
    },
  });
};

export const useRejectJoinRequest = (teamId: string) => {
  return useMutation({
    mutationFn: async (payload: { userId: string }) => {
      const { data } = await post<undefined, undefined>(TeamEndpoints.REJECT_JOIN_REQUEST, undefined, {
        teamId,
        userId: payload.userId,
      });
      return data;
    },
  });
};
