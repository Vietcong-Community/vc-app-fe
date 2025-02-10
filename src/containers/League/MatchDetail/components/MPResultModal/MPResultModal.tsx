import React, { useEffect, useState } from 'react';

import { Modal, Spin } from 'antd';
import { FormattedMessage } from 'react-intl';

import { Gap } from '../../../../../components/Gap/Gap';
import { useNotifications } from '../../../../../hooks/NotificationsHook';
import { NotificationType } from '../../../../../providers/NotificationsProvider/enums';

import { messages } from './messages';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  showFileUrl: boolean;
  url?: string;
}

export const MPResultModal: React.FC<IProps> = (props: IProps) => {
  const { isOpen, onClose, showFileUrl, url } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string[]>([]);
  const { showNotification } = useNotifications();

  const fetchContent = async (fileUrl: string) => {
    try {
      const response = await fetch(fileUrl);
      const rawText = await response.text();
      const lines = rawText.split('\n');
      setContent(lines);
      setIsLoading(false);
    } catch {
      showNotification(messages.downloadError, undefined, NotificationType.ERROR);
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen && url) {
      setIsLoading(true);
      fetchContent(url);
    }
  }, [isOpen]);

  return (
    <Modal
      title={<FormattedMessage {...messages.title} />}
      cancelButtonProps={{ style: { display: 'none' } }}
      onCancel={onClose}
      onOk={onClose}
      open={isOpen}
    >
      {isLoading && (
        <div style={{ textAlign: 'center', width: '100%' }}>
          <Gap defaultHeight={16} />
          <FormattedMessage {...messages.loadingInProgress} />
          <Gap defaultHeight={16} />
          <Spin size="large" style={{ margin: 'auto', width: '100%' }} />
        </div>
      )}
      {showFileUrl && !isLoading && (
        <>
          <b>
            <FormattedMessage {...messages.url} />
          </b>{' '}
          {url ?? ''}
        </>
      )}
      <Gap defaultHeight={16} />
      {content.map((item) => (
        <>
          {item}
          <br />
        </>
      ))}
    </Modal>
  );
};
