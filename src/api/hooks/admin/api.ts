import { useMutation } from '@tanstack/react-query';

import { del, post } from '../../apiFactory';
import { IIdentifiedEntity } from '../interfaces';

import { AdminEndpoints } from './endpoints';
import { IAdminCreateMatch } from './interfaces';

export const useAdminCreateMatch = (seasonId: string) => {
  return useMutation({
    mutationFn: async (payload: IAdminCreateMatch) => {
      const { data } = await post<IAdminCreateMatch, IIdentifiedEntity>(AdminEndpoints.CREATE_MATCH, payload, {
        seasonId,
      });
      return data;
    },
  });
};

export const useDeleteMatch = () => {
  return useMutation({
    mutationFn: async (matchId: string) => {
      const { data } = await del(AdminEndpoints.DELETE_MATCH, { matchId });
      return data;
    },
  });
};
