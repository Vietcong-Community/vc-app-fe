import React from 'react';

import { Divider, Flex, Spin } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useMatchDetail } from '../../../api/hooks/league/api';
import { Card } from '../../../components/Card/Card';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { H1 } from '../../../components/Titles/H1/H1';
import { MatchStatus } from '../../../constants/enums';
import { useRouter } from '../../../hooks/RouterHook';
import { formatDateForUser } from '../../../utils/dateUtils';
import { mapMatchStatusToTranslation } from '../../../utils/mappingLabelUtils';

import { ManageMenu } from './components/ManageMenu/ManageMenu';
import { messages } from './messages';

import * as S from './MatchDetail.style';

export const MatchDetail: React.FC = () => {
  const { query } = useRouter<{ leagueId: string; seasonId: string; matchId: string }>();

  const matchDetail = useMatchDetail(query.leagueId, query.seasonId, query.matchId);

  const scoreExists =
    matchDetail.data?.status === MatchStatus.FINISHED ||
    matchDetail.data?.status !== MatchStatus.WAITING_FOR_SCORE_CONFIRMATION;
  const showLoading = matchDetail.isLoading;

  return (
    <ContentLayout>
      <Flex align="center" justify="space-between">
        <H1>
          <FormattedMessage {...messages.title} />
        </H1>
        <ManageMenu
          leagueId={query.leagueId}
          matchId={query.matchId}
          seasonId={query.seasonId}
          status={matchDetail.data?.status}
        />
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
                    <S.InformationValue>{formatDateForUser(matchDetail.data?.startDate)}</S.InformationValue>
                  </div>
                  <div style={{ flex: 1, fontSize: 26, fontWeight: 600 }}>
                    {scoreExists
                      ? `${matchDetail.data?.challengerScore} - ${matchDetail.data?.opponentScore}`
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
                  <Card bordered style={{ textAlign: 'start' }}>
                    <S.TeamsLabel>
                      <FormattedMessage {...messages.firstTeam} />
                    </S.TeamsLabel>
                    <b>
                      <FormattedMessage {...messages.captain} />
                    </b>
                    {matchDetail.data?.challenger?.team?.name}
                  </Card>
                  <Card style={{ textAlign: 'start' }}>
                    <S.TeamsLabel>
                      <FormattedMessage {...messages.secondTeam} />
                    </S.TeamsLabel>
                    <b>
                      <FormattedMessage {...messages.captain} />
                    </b>
                    {matchDetail.data?.opponent?.team?.name}
                  </Card>
                </Flex>
              </Card>
            </S.TeamsContainer>
          </>
        )}
      </S.MatchInformationContainer>
    </ContentLayout>
  );
};
