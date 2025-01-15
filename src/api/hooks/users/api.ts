import { useQuery } from '@tanstack/react-query';

import { get } from '../../apiFactory';

import { UsersEndpoints } from './endpoints';
import { IUser } from './interfaces';

export const useUsers = () => {
  return useQuery({
    queryKey: ['Users'],
    queryFn: async () => {
      const { data } = await get<IUser[]>(UsersEndpoints.USERS);
      return data;
    },
    staleTime: Infinity,
  });
};
