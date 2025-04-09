import React, { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Flex, Spin } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useRecalculateMatchScoreByFileId } from '../../../api/hooks/league/api';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { Button } from '../../Button/Button';
import { MainButtonVariant } from '../../Button/enums';
import { Gap } from '../../Gap/Gap';

import { messages } from './messages';

interface IProps {
  fetchMPResults: () => Promise<void>;
  id: string;
  isOpen: boolean;
  matchId: string;
  url: string;
}

export const MPResultDetail: React.FC<IProps> = (props: IProps) => {
  const { fetchMPResults, id, isOpen, matchId, url } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const { showNotification } = useNotifications();

  const createRoundFromFile = useRecalculateMatchScoreByFileId();

  const onSubmit = async () => {
    try {
      await createRoundFromFile.mutateAsync({ fileId: id, matchId });
      await queryClient.refetchQueries({ queryKey: ['matchDetail', matchId] });
      await fetchMPResults();
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
