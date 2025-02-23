import React from 'react';

import { Modal } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useRemoveArticleImage } from '../../../../api/hooks/articles/api';
import { useNotifications } from '../../../../hooks/NotificationsHook';
import { useRouter } from '../../../../hooks/RouterHook';
import { NotificationType } from '../../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../../routes/enums';

import { messages } from './messages';

interface IProps {
  articleId: string;
  image: {
    id: string;
    url: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteArticleImageModal: React.FC<IProps> = (props: IProps) => {
  const { articleId, image, isOpen, onClose } = props;
  const { navigate } = useRouter();
  const { showNotification } = useNotifications();
  const removeArticleImage = useRemoveArticleImage(articleId);

  const onDeleteArticleImage = async () => {
    try {
      await removeArticleImage.mutateAsync();
      showNotification(messages.deleteSuccess);
      navigate(Routes.ARTICLES);
    } catch {
      showNotification(messages.deleteFailed, undefined, NotificationType.ERROR);
    }
  };

  return (
    <Modal
      title={<FormattedMessage {...messages.title} />}
      onCancel={onClose}
      onOk={onDeleteArticleImage}
      confirmLoading={removeArticleImage.isPending}
      open={isOpen}
    >
      <FormattedMessage {...messages.description} values={{ value: image?.id ?? '' }} />
    </Modal>
  );
};
