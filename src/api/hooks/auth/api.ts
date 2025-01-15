import { useMutation } from '@tanstack/react-query';

import { post } from '../../apiFactory';
import { IIdentifiedEntity } from '../interfaces';

import { AuthEndpoints } from './endpoints';
import { ICreateUser } from './interfaces';

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (payload: ICreateUser) => {
      const { data } = await post<ICreateUser, IIdentifiedEntity>(AuthEndpoints.REGISTRATION, payload);
      return data;
    },
  });
};
