import { useMutation } from '@tanstack/react-query';

import { post } from '../../apiFactory';
import { IIdentifiedEntity } from '../interfaces';

import { AuthEndpoints } from './endpoints';
import { IChangePassword, ICreateUser, IForgottenPassword } from './interfaces';

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (payload: ICreateUser) => {
      const { data } = await post<ICreateUser, IIdentifiedEntity>(AuthEndpoints.REGISTRATION, payload);
      return data;
    },
  });
};

export const useForgottenPasswordRequest = () => {
  return useMutation({
    mutationFn: async (payload: IForgottenPassword) => {
      const { data } = await post<IForgottenPassword, undefined>(AuthEndpoints.FORGOTTEN_PASSWORD, payload);
      return data;
    },
  });
};

export const useChangePasswordWithToken = () => {
  return useMutation({
    mutationFn: async (payload: IChangePassword) => {
      const { data } = await post<IChangePassword, undefined>(AuthEndpoints.CHANGE_PASSWORD, payload);
      return data;
    },
  });
};
