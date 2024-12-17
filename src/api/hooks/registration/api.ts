import { useMutation } from '@tanstack/react-query';

import { post } from '../../apiFactory';

import { RegistrationEndpoints } from './endpoints';
import { IRegisterUser, IRegisteredUser } from './interfaces';

export const useRegisterUsers = () => {
  return useMutation({
    mutationFn: async (payload: IRegisterUser) => {
      const { data } = await post<IRegisterUser, IRegisteredUser>(RegistrationEndpoints.REGISTER, payload);
      return data;
    },
  });
};
