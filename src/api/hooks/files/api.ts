import { useMutation } from '@tanstack/react-query';

import { post } from '../../apiFactory';

import { FilesEndpoints } from './endpoints';

export const useConfirmImageUploadUrl = () => {
  return useMutation({
    mutationFn: async (payload: { fileId: string }) => {
      const { data } = await post<undefined, undefined>(FilesEndpoints.CONFIRM_IMAGE_UPLOAD, undefined, {
        fileId: payload.fileId,
      });
      return data;
    },
  });
};
