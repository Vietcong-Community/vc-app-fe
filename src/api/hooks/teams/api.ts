import { useMutation, useQuery } from '@tanstack/react-query';

import { del, get, post, put } from '../../apiFactory';
import { STALE_TIME } from '../../constants';
import { IgnoredErrorCodes } from '../../types';
import { IIdentifiedEntity } from '../interfaces';
import { ISeason } from '../league/interfaces';

import { TeamEndpoints } from './endpoints';
import {
  IAvatarUpload,
  ICreateTeam,
  IMeTeams,
  ITeam,
  ITeamListQuery,
  ITeamPlayers,
  IUpdateTeam,
  IUpdateUserInTeam,
} from './interfaces';

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

export const useMeTeams = (
  refetchOnMount?: boolean | 'always',
  ignoredErrorCodes?: IgnoredErrorCodes,
  enabled = true,
) => {
  return useQuery({
    queryKey: ['loggedUserTeams'],
    queryFn: async () => {
      const { data } = await get<{ items: IMeTeams[] }>(TeamEndpoints.ME_TEAMS, {}, undefined, ignoredErrorCodes);
      return data;
    },
    staleTime: STALE_TIME,
    enabled,
    refetchOnMount: refetchOnMount ?? 'always',
  });
};

export const useTeamAvatarUploadUrl = (teamId: string) => {
  return useMutation({
    mutationFn: async (payload: IAvatarUpload) => {
      const { data } = await post<IAvatarUpload, { fileId: string; uploadUrl: string }>(
        TeamEndpoints.UPLOAD_TEAM_AVATAR,
        payload,
        { teamId },
      );
      return data;
    },
  });
};

export const useHasAllowedToJoinTheTeam = (teamId: string, ignoredErrorCodes?: IgnoredErrorCodes) => {
  return useQuery({
    queryKey: ['hasAllowedToJoinTheTeam', teamId],
    queryFn: async () => {
      const { data } = await get<{ hasAllowedToJoin: boolean }>(
        TeamEndpoints.HAS_ALLOWED_TO_JOIN,
        { teamId },
        undefined,
        ignoredErrorCodes,
      );
      return data;
    },
    staleTime: STALE_TIME,
  });
};

export const useTeamSeasons = (teamId: string, refetchOnMount?: boolean | 'always') => {
  return useQuery({
    queryKey: ['teamSeasons', teamId],
    queryFn: async () => {
      const { data } = await get<{ items: ISeason[] }>(TeamEndpoints.TEAM_SEASONS, { teamId });
      return data;
    },
    staleTime: Infinity,
    refetchOnMount: refetchOnMount ?? 'always',
  });
};

export const useCreateTeam = () => {
  return useMutation({
    mutationFn: async (payload: ICreateTeam) => {
      const { data } = await post<ICreateTeam, IIdentifiedEntity>(TeamEndpoints.TEAMS, payload);
      return data;
    },
  });
};

export const useUpdateTeam = (id: string) => {
  return useMutation({
    mutationFn: async (payload: IUpdateTeam) => {
      const { data } = await put<IUpdateTeam, undefined>(TeamEndpoints.TEAM_BY_ID, payload, { id });
      return data;
    },
  });
};

export const useUpdateUserInTeam = (userInTeamId: string) => {
  return useMutation({
    mutationFn: async (payload: IUpdateUserInTeam) => {
      const { data } = await put<IUpdateUserInTeam, undefined>(TeamEndpoints.UPDATE_USER_IN_TEAM, payload, {
        userInTeamId,
      });
      return data;
    },
  });
};

export const useRemoveUserFromTeam = () => {
  return useMutation({
    mutationFn: async (payload: { teamId: string; userId: string }) => {
      const { data } = await del(TeamEndpoints.REMOVE_USER_FROM_TEAM, {
        teamId: payload.teamId,
        userId: payload.userId,
      });
      return data;
    },
  });
};

export const useTeamsList = (query?: ITeamListQuery, refetchOnMount?: boolean | 'always', enabled = true) => {
  return useQuery({
    queryKey: ['teams', JSON.stringify(query ?? {})],
    queryFn: async () => {
      const { data } = await get<{ teams: ITeam[]; total: number }>(TeamEndpoints.TEAMS, undefined, query);
      return data;
    },
    enabled,
    refetchOnMount: refetchOnMount ?? true,
  });
};
