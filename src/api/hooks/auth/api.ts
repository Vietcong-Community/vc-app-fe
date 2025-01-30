import { useMutation, useQuery } from '@tanstack/react-query';

import { get, post, put } from '../../apiFactory';
import { STALE_TIME } from '../../constants';
import { IgnoredErrorCodes } from '../../types';
import { IIdentifiedEntity, IUser } from '../interfaces';

import { AuthEndpoints } from './endpoints';
import {
  IAvatarUpload,
  IChangePassword,
  ICreateUser,
  IForgottenPassword,
  ILoginSuccess,
  IUpdateUser,
  IUserLogin,
} from './interfaces';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (payload: IUserLogin) => {
      const { data } = await post<IUserLogin, ILoginSuccess>(AuthEndpoints.LOGIN, payload);
      return data;
    },
  });
};

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

export const useUserMe = (
  refetchOnMount?: boolean | 'always',
  ignoreErrorCodes?: IgnoredErrorCodes,
  enabled = true,
) => {
  return useQuery({
    queryKey: ['userMe'],
    queryFn: async () => {
      const { data } = await get<IUser>(AuthEndpoints.USER_ME, undefined, undefined, ignoreErrorCodes);
      return data;
    },
    enabled,
    staleTime: STALE_TIME,
    refetchOnMount: refetchOnMount ?? false,
  });
};

export const useUpdateMe = () => {
  return useMutation({
    mutationFn: async (payload: IUpdateUser) => {
      const { data } = await put<IUpdateUser, IIdentifiedEntity>(AuthEndpoints.USER_ME, payload);
      return data;
    },
  });
};

export const useAvatarUploadUrl = () => {
  return useMutation({
    mutationFn: async (payload: IAvatarUpload) => {
      const { data } = await post<IAvatarUpload, { fileId: string; uploadUrl: string }>(
        AuthEndpoints.UPLOAD_AVATAR_URL,
        payload,
      );
      return data;
    },
  });
};
