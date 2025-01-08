import { useMutation, useQuery } from '@tanstack/react-query';

import { del, get, post, put } from '../../apiFactory';

import { TeamEndpoints } from './endpoints';
import { ISaveTeam, ITeam } from './interfaces';

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

export const useCreateTeam = () => {
  return useMutation({
    mutationFn: async (payload: ISaveTeam) => {
      return post<ISaveTeam, ITeam>(TeamEndpoints.CREATE_TEAM, payload);
    },
  });
};

export const useUpdateTeam = () => {
  return useMutation({
    mutationFn: async (payload: { data: ISaveTeam; id: string }) => {
      return put<ISaveTeam, ITeam>(TeamEndpoints.TEAM_BY_ID, payload.data, { id: payload.id });
    },
  });
};

export const useDeleteTeam = () => {
  return useMutation({
    mutationFn: async (payload: { id: string }) => {
      return del(TeamEndpoints.TEAM_BY_ID, { id: payload.id });
    },
  });
};

export const useArchiveTeam = () => {
  return useMutation({
    mutationFn: async (payload: { id: string }) => {
      return put<undefined, ITeam>(TeamEndpoints.ARCHIVE_TEAM, undefined, {
        id: payload.id,
      });
    },
  });
};
