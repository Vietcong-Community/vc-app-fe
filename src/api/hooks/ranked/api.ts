import { useMutation, useQuery } from '@tanstack/react-query';

import { get, post } from '../../apiFactory';
import { IIdentifiedEntity } from '../interfaces';

import { RankedEndpoints } from './endpoints';
import { ICreateRankedMatch, ILeaveMatch, IVoteItem } from './interfaces';

export const useMapVoteState = (matchId: string) => {
  return useQuery({
    queryKey: ['mapVoteState', matchId],
    queryFn: async () => {
      const { data } = await get<{ mapPickList: { items: IVoteItem[]; total: number } }>(
        RankedEndpoints.MAP_VOTE_STATE,
        { matchId },
      );
      return data;
    },
  });
};

export const useCreateRankedMatch = (seasonId: string) => {
  return useMutation({
    mutationFn: async (payload: ICreateRankedMatch) => {
      const { data } = await post<ICreateRankedMatch, IIdentifiedEntity>(RankedEndpoints.CREATE_MATCH, payload, {
        seasonId,
      });
      return data;
    },
  });
};

export const usePickMapForRankedMatch = () => {
  return useMutation({
    mutationFn: async (payload: { matchId: string; mapId: string }) => {
      const { data } = await post<undefined, IIdentifiedEntity>(RankedEndpoints.MAP_PICK, undefined, {
        matchId: payload.matchId,
        mapId: payload.mapId,
      });
      return data;
    },
  });
};

export const useLeaveRankedMatch = (matchId: string) => {
  return useMutation({
    mutationFn: async (payload: ILeaveMatch) => {
      const { data } = await post<ILeaveMatch, undefined>(RankedEndpoints.LEAVE_MATCH, payload, {
        matchId,
      });
      return data;
    },
  });
};

export const useLockMatch = (matchId: string) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await post<undefined, undefined>(RankedEndpoints.ADMIN_CLOSE_MATCH, undefined, {
        matchId,
      });
      return data;
    },
  });
};

export const useConfirmMatchScore = (matchId: string) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await post<undefined, undefined>(RankedEndpoints.CONFIRM_MATCH_SCORE, undefined, {
        matchId,
      });
      return data;
    },
  });
};

export const useCanCreateNewMatch = (seasonId: string) => {
  return useQuery({
    queryKey: ['canCreateNewMatch', seasonId],
    queryFn: async () => {
      const { data } = await get<{ canCreateMatch: boolean }>(RankedEndpoints.CAN_CREATE_NEW_MATCH, { seasonId });
      return data;
    },
  });
};
