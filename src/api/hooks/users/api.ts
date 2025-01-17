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

export const useUserDetail = (id: string) => {
  return useQuery({
    queryKey: ['userDetail', id],
    queryFn: async () => {
      const { data } = await get<IUser>(UsersEndpoints.USER_BY_ID, { id });
      return data;
    },
    staleTime: Infinity,
  });
};
