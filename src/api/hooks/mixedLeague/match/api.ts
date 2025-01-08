import { useMutation, useQuery } from '@tanstack/react-query';

import { del, get, put } from '../../../apiFactory';
import { IMixedMatch, IMixedMatchResult, ISaveMixedMatch } from '../interfaces';

import { MixedMatchEndpoints } from './endpoints';

export const useMatchById = (id: string, refetchOnMount?: boolean | 'always') => {
  return useQuery({
    queryKey: ['matchesById', id],
    queryFn: async () => {
      const { data } = await get<IMixedMatch>(MixedMatchEndpoints.MATCH_BY_ID, { id });
      return data;
    },
    staleTime: Infinity,
    refetchOnMount: refetchOnMount ?? 'always',
  });
};

export const useUpdateMatch = (matchId: string) => {
  return useMutation({
    mutationFn: async (payload: ISaveMixedMatch) => {
      return put<ISaveMixedMatch, IMixedMatch>(MixedMatchEndpoints.MATCH_BY_ID, payload, { id: matchId });
    },
  });
};

export const useConfirmMatch = () => {
  return useMutation({
    mutationFn: async (payload: { id: string }) => {
      return put<{}, IMixedMatch>(MixedMatchEndpoints.CONFIRM_MATCH, {}, { id: payload.id });
    },
  });
};

export const useSaveMatchResult = () => {
  return useMutation({
    mutationFn: async (payload: IMixedMatchResult) => {
      return put<IMixedMatchResult, IMixedMatch>(MixedMatchEndpoints.SAVE_RESULT, payload);
    },
  });
};

export const useDeleteMatch = () => {
  return useMutation({
    mutationFn: async (payload: { id: string }) => {
      return del(MixedMatchEndpoints.MATCH_BY_ID, { id: payload.id });
    },
  });
};
