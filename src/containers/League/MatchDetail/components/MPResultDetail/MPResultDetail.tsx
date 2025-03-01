import React, { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Flex, Spin } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useRecalculateMatchScoreByFileId } from '../../../../../api/hooks/league/api';
import { Button } from '../../../../../components/Button/Button';
import { MainButtonVariant } from '../../../../../components/Button/enums';
import { Gap } from '../../../../../components/Gap/Gap';
import { useNotifications } from '../../../../../hooks/NotificationsHook';
import { NotificationType } from '../../../../../providers/NotificationsProvider/enums';

import { messages } from './messages';

interface IProps {
  id: string;
  isOpen: boolean;
  matchId: string;
  url: string;
}

export const MPResultDetail: React.FC<IProps> = (props: IProps) => {
  const { id, isOpen, matchId, url } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const { showNotification } = useNotifications();

  const createRoundFromFile = useRecalculateMatchScoreByFileId();

  const onSubmit = async () => {
    try {
      await createRoundFromFile.mutateAsync({ fileId: id, matchId });
      await queryClient.refetchQueries({ queryKey: ['matchDetail', matchId] });
      showNotification(messages.createSuccess);
    } catch {
      showNotification(messages.createFailed, undefined, NotificationType.ERROR);
    }
  };

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
      {content && (
        <>
          <Gap defaultHeight={16} />
          <Flex justify="end">
            <Button onClick={onSubmit} variant={MainButtonVariant.PRIMARY}>
              <FormattedMessage {...messages.createRound} />
            </Button>
          </Flex>
        </>
      )}
    </>
  );
};
