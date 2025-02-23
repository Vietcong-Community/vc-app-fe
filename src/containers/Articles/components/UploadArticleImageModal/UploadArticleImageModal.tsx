import React, { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Modal, UploadFile } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useArticleImageUploadUrl } from '../../../../api/hooks/articles/api';
import { useConfirmImageUploadUrl } from '../../../../api/hooks/files/api';
import { UploadField } from '../../../../components/Fields/UploadField/UploadField';
import { useNotifications } from '../../../../hooks/NotificationsHook';
import { NotificationType } from '../../../../providers/NotificationsProvider/enums';
import { uploadFileWithPresignedUrl } from '../../../../utils/fileUtils';

import { messages } from './messages';

import * as S from './UploadArticleImageModal.style';

interface IProps {
  articleId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const UploadArticleImageModal: React.FC<IProps> = (props: IProps) => {
  const { articleId, isOpen, onClose } = props;
  const queryClient = useQueryClient();
  const { showNotification } = useNotifications();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const articleImageUpload = useArticleImageUploadUrl(articleId);
  const confirmUpload = useConfirmImageUploadUrl();

  const uploadImage = async () => {
    try {
      if (fileList.length > 0) {
        const imageName = fileList?.[0]?.name;
        if (imageName) {
          const response = await articleImageUpload.mutateAsync({ fileName: imageName });

          await uploadFileWithPresignedUrl(fileList?.[0], response.uploadUrl);

          await confirmUpload.mutateAsync({ fileId: response.fileId });
        }
        setFileList([]);
        await queryClient.refetchQueries({ queryKey: ['articleById', articleId] });
        showNotification(messages.uploadSuccess);
        onClose();
      }
    } catch {
      showNotification(messages.uploadFailed, undefined, NotificationType.ERROR);
    }
  };

  useEffect(() => {
    if (fileList.length === 1) {
      uploadImage();
    }
  }, [fileList.length]);

  return (
    <Modal
      title={<FormattedMessage {...messages.title} />}
      okButtonProps={{ style: { display: 'none' } }}
      onCancel={onClose}
      open={isOpen}
    >
      <S.UploadBox>
        <UploadField fileList={fileList} setFileList={setFileList} />
      </S.UploadBox>
    </Modal>
  );
};
