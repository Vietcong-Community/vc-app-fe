import { useMutation, useQuery } from '@tanstack/react-query';

import { del, get, patch, post, put } from '../../apiFactory';

import { SeasonsEndpoints } from './endpoints';
import { ISaveSeason, ISeason } from './interfaces';

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

export const useSeasonDetail = (id: string) => {
  return useQuery({
    queryKey: ['season', id],
    queryFn: async () => {
      const { data } = await get<ISeason>(SeasonsEndpoints.SEASON_BY_ID, { id });
      return data;
    },
    staleTime: Infinity,
    refetchOnMount: 'always',
  });
};

export const useCreateSeason = () => {
  return useMutation({
    mutationFn: async (payload: ISaveSeason) => {
      return post<ISaveSeason, ISeason>(SeasonsEndpoints.SEASONS, payload);
    },
  });
};

export const useUpdateSeason = () => {
  return useMutation({
    mutationFn: async (payload: { data: ISaveSeason; id: string }) => {
      return patch<ISaveSeason, ISeason>(SeasonsEndpoints.SEASON_BY_ID, payload.data, { id: payload.id });
    },
  });
};

export const useDeleteSeason = () => {
  return useMutation({
    mutationFn: async (payload: { id: string }) => {
      return del(SeasonsEndpoints.SEASON_BY_ID, { id: payload.id });
    },
  });
};

export const useActivateSeason = () => {
  return useMutation({
    mutationFn: async (payload: { id: string }) => {
      return put<undefined, ISeason>(SeasonsEndpoints.ACTIVATE_SEASON, undefined, {
        id: payload.id,
      });
    },
  });
};

export const useArchiveSeason = () => {
  return useMutation({
    mutationFn: async (payload: { id: string }) => {
      return put<undefined, ISeason>(SeasonsEndpoints.ARCHIVE_SEASON, undefined, {
        id: payload.id,
      });
    },
  });
};
