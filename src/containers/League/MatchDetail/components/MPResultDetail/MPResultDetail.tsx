import React, { useEffect, useState } from 'react';

import { Spin } from 'antd';
import { FormattedMessage } from 'react-intl';

import { Gap } from '../../../../../components/Gap/Gap';
import { useNotifications } from '../../../../../hooks/NotificationsHook';
import { NotificationType } from '../../../../../providers/NotificationsProvider/enums';
import { messages } from '../MPResultModal/messages';

interface IProps {
  isOpen: boolean;
  url: string;
}

export const MPResultDetail: React.FC<IProps> = (props: IProps) => {
  const { isOpen, url } = props;
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
    }
  };

  useEffect(() => {
    if (isOpen && url) {
      setIsLoading(true);
      fetchContent(url);
    }
  }, [isOpen]);

  return (
    <>
      {isLoading && (
        <div style={{ textAlign: 'center', width: '100%' }}>
          <Gap defaultHeight={16} />
          <FormattedMessage {...messages.loadingInProgress} />
          <Gap defaultHeight={16} />
          <Spin size="large" style={{ margin: 'auto', width: '100%' }} />
        </div>
      )}
      {!isLoading && (
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
    </>
  );
};
