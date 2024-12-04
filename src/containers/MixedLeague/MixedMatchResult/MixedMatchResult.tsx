import React, { useEffect, useState } from 'react';

import { Divider, Flex, Spin } from 'antd';
import { uniqBy } from 'lodash';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useMaps } from '../../../api/hooks/enums/api';
import { useMatchById, useSaveMatchResult } from '../../../api/hooks/mixedLeague/match/api';
import { useUsers } from '../../../api/hooks/users/api';
import { IUser } from '../../../api/hooks/users/interfaces';
import { Button } from '../../../components/Button/Button';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { H1 } from '../../../components/Titles/H1/H1';
import { useRouter } from '../../../hooks/RouterHook';
import { Routes } from '../../../routes/enums';

import { messages } from './messages';
import { BasicInformation } from './sections/BasicInformation/BasicInformation';
import { IFormData as IBasicInformationFormData } from './sections/BasicInformation/BasicInformation.fields';
import { RoundsInformation } from './sections/RoundsInformation/RoundsInformation';
import { IFormData as IRoundsInformationFormData } from './sections/RoundsInformation/RoundsInformation.fields';
import { Summary } from './sections/Summary/Summary';
import { IMixedMatchResultFormData } from './types';

export const MixedMatchResult: React.FC = () => {
  const { navigate, query } = useRouter<{ id: string }>();
  const { formatMessage } = useIntl();
  const [currentStepNumber, setCurrentStepNumber] = useState<number>(0);
  const [mixedMatchFormData, setMixedMatchFormData] = useState<IMixedMatchResultFormData>({});
  const [selectedPlayers, setSelectedPlayers] = useState<IUser[]>([]);

  const saveResult = useSaveMatchResult();
  const matchDetail = useMatchById(query.id);
  const maps = useMaps();
  const players = useUsers();

  useEffect(() => {
    if (matchDetail.isFetchedAfterMount) {
      const maps = uniqBy(
        matchDetail.data?.rounds?.map((item) => item.map).filter((item) => !!item.name),
        'name',
      );
      const initialMixedMatchData: Partial<IMixedMatchResultFormData> = {
        BASIC_INFORMATION: {
          firstMapId: maps?.[0]?.id,
          secondMapId: maps?.[1]?.id,
          players: [],
        },
        ROUNDS_INFORMATION: {
          rounds: [],
        },
      };
      setMixedMatchFormData(initialMixedMatchData);
      setCurrentStepNumber(1);
    }
  }, [matchDetail.isFetchedAfterMount]);

  useEffect(() => {
    if (mixedMatchFormData.BASIC_INFORMATION?.players?.length !== 0) {
      const filteredUsers: IUser[] = [];
      mixedMatchFormData.BASIC_INFORMATION?.players.forEach((item) => {
        const foundPlayer = players.data?.find((player) => player.id === item);
        if (foundPlayer) {
          filteredUsers.push(foundPlayer);
        }
      });

      setSelectedPlayers(filteredUsers);
    }
  }, [JSON.stringify(mixedMatchFormData.BASIC_INFORMATION?.players ?? [])]);

  const onSubmit = () => {
    console.log(mixedMatchFormData);
  };

  const goBackToMatchDetail = () => navigate(Routes.MIXED_MATCH_DETAIL.replace(':id', query.id));

  const showLoading = matchDetail.isLoading || !matchDetail.isFetchedAfterMount;

  const goForward = () => {
    setCurrentStepNumber((n) => (n ?? 1) + 1);
  };

  const goBack = () => {
    setCurrentStepNumber((n) => (n && n > 1 ? n - 1 : n));
  };

  const onBasicInformationSubmit = (values: IBasicInformationFormData) => {
    setMixedMatchFormData((data) => ({ ...data, BASIC_INFORMATION: { ...data.BASIC_INFORMATION, ...values } }));
    goForward();
  };

  const onRoundsInformationSubmit = (values: IRoundsInformationFormData) => {
    setMixedMatchFormData((data) => ({ ...data, ROUNDS_INFORMATION: { ...data.ROUNDS_INFORMATION, ...values } }));
    goForward();
  };

  console.log(mixedMatchFormData);

  return (
    <>
      <Helmet title={formatMessage(messages.title)} />
      <ContentLayout>
        <Flex align="center" justify="space-between">
          <H1>
            <FormattedMessage {...messages.title} />
          </H1>
          <Button onClick={goBackToMatchDetail} variant="default">
            <FormattedMessage {...messages.goBack} />
          </Button>
        </Flex>
        <Divider style={{ marginTop: 0 }} />
        {showLoading && <Spin size="large" />}
        {currentStepNumber === 1 && (
          <BasicInformation
            goBack={goBackToMatchDetail}
            initialValues={mixedMatchFormData.BASIC_INFORMATION}
            maps={maps.data ?? []}
            onSubmit={onBasicInformationSubmit}
            players={players.data ?? []}
          />
        )}
        {currentStepNumber === 2 && (
          <RoundsInformation goBack={goBack} onSubmit={onRoundsInformationSubmit} players={selectedPlayers} />
        )}
        {currentStepNumber === 3 && (
          <Summary data={mixedMatchFormData} goBack={goBack} isSubmitting={saveResult.isPending} onSubmit={onSubmit} />
        )}
      </ContentLayout>
    </>
  );
};
