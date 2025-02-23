import { useMutation, useQuery } from '@tanstack/react-query';

import { get, post } from '../../apiFactory';
import { IIdentifiedEntity, IMap } from '../interfaces';

import { MapEndpoints } from './endpoints';
import { ICreateMap } from './interfaces';

export const useCreateMap = () => {
  return useMutation({
    mutationFn: async (payload: ICreateMap) => {
      const { data } = await post<ICreateMap, IIdentifiedEntity>(MapEndpoints.MAPS, payload);
      return data;
    },
  });
};

export const useAllMaps = (enabled = true) => {
  return useQuery({
    queryKey: ['maps'],
    queryFn: async () => {
      const { data } = await get<{ items: IMap[] }>(MapEndpoints.MAPS);
      return data;
    },
    enabled,
    staleTime: Infinity,
  });
};
