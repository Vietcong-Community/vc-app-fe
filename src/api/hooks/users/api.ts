import { useMutation, useQuery } from '@tanstack/react-query';

import { get, post } from '../../apiFactory';

import { UsersEndpoints } from './endpoints';
import { IUser, IRegisterUser } from './interfaces';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await get<IUser[]>(UsersEndpoints.USERS);
      return data;
    },
    staleTime: Infinity,
  });
};

export const useRegisterUsers = () => {
  return useMutation({
    mutationFn: async (payload: IRegisterUser) => {
      const { data } = await post<IRegisterUser, IUser>(UsersEndpoints.REGISTER, payload);
      return data;
    },
  });
};
