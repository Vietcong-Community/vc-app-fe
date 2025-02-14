import React from 'react';

import { Modal } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { useRemoveArticle } from '../../../../api/hooks/articles/api';
import { useNotifications } from '../../../../hooks/NotificationsHook';
import { useRouter } from '../../../../hooks/RouterHook';
import { NotificationType } from '../../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../../routes/enums';

import { messages } from './messages';

interface IProps {
  articleId: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const DeleteArticleModal: React.FC<IProps> = (props: IProps) => {
  const { articleId, isOpen, onClose, title } = props;
  const { navigate } = useRouter();
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();
  const removeArticle = useRemoveArticle(articleId);

  const onDeleteArticle = async () => {
    try {
      await removeArticle.mutateAsync();
      showNotification(messages.deleteSuccess);
      navigate(Routes.ARTICLES);
    } catch {
      showNotification(messages.deleteFailed, undefined, NotificationType.ERROR);
    }
  };

  return (
    <Modal
      title={<FormattedMessage {...messages.title} />}
      cancelButtonProps={{ title: formatMessage(messages.cancel) }}
      okButtonProps={{ title: formatMessage(messages.confirm) }}
      onCancel={onClose}
      onOk={onDeleteArticle}
      confirmLoading={removeArticle.isPending}
      open={isOpen}
    >
      <FormattedMessage {...messages.description} values={{ value: title }} />
    </Modal>
  );
};
