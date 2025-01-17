import React, { useMemo } from 'react';

import { Divider, Flex, Spin } from 'antd';
import { uniqBy } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { IMatch } from '../../../api/hooks/league/interfaces';
import { Card } from '../../../components/Card/Card';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { H1 } from '../../../components/Titles/H1/H1';
import { MatchStatus } from '../../../constants/enums';
import { formatDateForUser } from '../../../utils/dateUtils';
import { mapMatchStatusToTranslation } from '../../../utils/mappingLabelUtils';

import { ManageMenu } from './components/ManageMenu/ManageMenu';
import { Maps } from './components/Maps/Maps';
import { messages } from './messages';

import * as S from './MatchDetail.style';

export const MatchDetail: React.FC = () => {
  // const { query } = useRouter<{ id: string }>();

  const matchDetail: { data?: IMatch; isLoading: boolean; isFetched: boolean } = { isLoading: false, isFetched: false };

  const scoreExists = matchDetail.data?.status !== MatchStatus.NEW && matchDetail.data?.status !== MatchStatus.READY;
  const showLoading = matchDetail.isLoading;

  const maps = useMemo(
    () =>
      uniqBy(
        matchDetail.data?.rounds?.map((item) => item.map).filter((item) => !!item.name),
        'name',
      ),
    [matchDetail.isFetched],
  );
  const isPossibleToConfirmMatch =
    maps.length === 2 && !!matchDetail.data?.firstCaptain && !!matchDetail.data?.secondCaptain;

  return (
    <ContentLayout>
      <Flex align="center" justify="space-between">
        <H1>
          <FormattedMessage {...messages.title} />
        </H1>
        <ManageMenu isPossibleToConfirmMatch={isPossibleToConfirmMatch} status={matchDetail.data?.status} />
      </Flex>
      <Divider style={{ marginTop: 0 }} />
      <S.MatchInformationContainer>
        {showLoading && <Spin size="large" />}
        {!showLoading && (
          <>
            <S.TeamsContainer>
              <Card>
                <Flex justify="space-between">
                  <div style={{ flex: 1, textAlign: 'start' }}>
                    <S.InformationLabel>
                      <FormattedMessage {...messages.date} />
                    </S.InformationLabel>
                    <br />
                    <S.InformationValue>{formatDateForUser(matchDetail.data?.date)}</S.InformationValue>
                  </div>
                  <div style={{ flex: 1, fontSize: 26, fontWeight: 600 }}>
                    {scoreExists
                      ? `${matchDetail.data?.firstTeamScore} - ${matchDetail.data?.secondTeamScore}`
                      : ' ? - ?'}
                  </div>
                  <div style={{ flex: 1, textAlign: 'end' }}>
                    <S.InformationLabel>
                      <FormattedMessage {...messages.status} />
                    </S.InformationLabel>
                    <br />
                    <S.InformationValue>{mapMatchStatusToTranslation(matchDetail.data?.status)}</S.InformationValue>
                  </div>
                </Flex>
                <br />
                <Flex justify="space-between" gap={16}>
                  <Card style={{ textAlign: 'start' }}>
                    <S.TeamsLabel>
                      <FormattedMessage {...messages.firstTeam} />
                    </S.TeamsLabel>
                    <b>
                      <FormattedMessage {...messages.captain} />
                    </b>
                    {matchDetail.data?.firstCaptain?.nickname}
                  </Card>
                  <Card style={{ textAlign: 'start' }}>
                    <S.TeamsLabel>
                      <FormattedMessage {...messages.secondTeam} />
                    </S.TeamsLabel>
                    <b>
                      <FormattedMessage {...messages.captain} />
                    </b>
                    {matchDetail.data?.secondCaptain?.nickname}
                  </Card>
                </Flex>
              </Card>
            </S.TeamsContainer>
            <Maps maps={maps} />
          </>
        )}
      </S.MatchInformationContainer>
    </ContentLayout>
  );
};
