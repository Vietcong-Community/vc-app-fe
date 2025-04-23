import React, { useEffect, useMemo, useRef, useState } from 'react';

import { Button, Divider, Dropdown, Flex, MenuProps, Spin } from 'antd';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useUserMe } from '../../../api/hooks/auth/api';
import { useEliminatedMaps, useMapsInSeason, useMatchDetail, useSeasonTeams } from '../../../api/hooks/league/api';
import { useMeTeams, useTeamPlayers } from '../../../api/hooks/teams/api';
import { EaseInOutContainer } from '../../../components/Animations/EaseInOutContainer/EaseInOutContainer';
import { BreadcrumbItem } from '../../../components/BreadcrumbItem/BreadcrumbItem';
import { Card } from '../../../components/Card/Card';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import {
  EliminateMapModal,
  IEliminateMapModalConfig,
} from '../../../components/Modals/EliminateMapModal/EliminateMapModal';
import { ResetMapPickModal } from '../../../components/Modals/ResetMapPickModal/ResetMapPickModal';
import { H1 } from '../../../components/Titles/H1/H1';
import { UNSET_MAP_NAME } from '../../../constants/constants';
import { MatchStatus, MatchType, Role } from '../../../constants/enums';
import { useRouter } from '../../../hooks/RouterHook';
import { Routes } from '../../../routes/enums';
import { theme } from '../../../theme/theme';
import { formatDateForUser } from '../../../utils/dateUtils';
import { canUserManageMatch } from '../../../utils/matchUtils';

import { messages } from './messages';

import * as S from './MapPick.style';

const POLLING_INTERVAL = 5_000;
const INITAL_MODAL_STATE = { isOpen: false, id: '', name: '' };

export const MapPickCont: React.FC = () => {
  const { navigate, query } = useRouter<{ matchId: string }>();
  const { formatMessage } = useIntl();
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [pickMapModalState, setPickMapModalState] = useState<IEliminateMapModalConfig>(INITAL_MODAL_STATE);
  const pollingInterval = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const matchDetail = useMatchDetail(query.matchId);
  const matchIsAccepted = matchDetail.data?.status === MatchStatus.ACCEPTED;
  const userMe = useUserMe('always', [401], matchIsAccepted);
  const myTeams = useMeTeams(undefined, [401], matchIsAccepted);
  const seasonTeams = useSeasonTeams(matchDetail.data?.season?.id ?? '', [401], 'always', matchIsAccepted);
  const challengerTeamMembers = useTeamPlayers(matchDetail.data?.challenger?.team?.id, undefined, matchIsAccepted);
  const opponentTeamMembers = useTeamPlayers(matchDetail.data?.opponent?.team?.id, undefined, matchIsAccepted);

  const seasonMaps = useMapsInSeason(matchDetail.data?.season?.id ?? '', matchIsAccepted);
  const eliminatedMaps = useEliminatedMaps(query.matchId, matchIsAccepted);

  const showLoading = matchDetail.isLoading || eliminatedMaps.isLoading;
  const userIsAdmin = !!userMe.data?.roles.includes(Role.ADMIN);
  const isPossibleToManageMatch = useMemo(() => {
    return canUserManageMatch(
      myTeams.data?.items ?? [],
      seasonTeams.data?.items ?? [],
      matchDetail.data?.challenger.team?.id,
      matchDetail.data?.opponent?.team?.id,
    );
  }, [
    !!myTeams?.data?.items,
    !!seasonTeams?.data?.items,
    matchDetail.data?.challenger.team?.id,
    matchDetail.data?.opponent.team?.id,
  ]);

  useEffect(() => {
    if (matchDetail.data?.type === MatchType.GROUP) {
      navigate(Routes.CHAMPIONSHIP_MATCH_DETAIL.replace(':matchId', query.matchId));
    }
  }, [matchDetail.data?.type, matchDetail.data?.status]);

  useEffect(() => {
    if (
      matchDetail.isFetched &&
      matchDetail.data?.type !== MatchType.GROUP &&
      matchDetail.data?.status === MatchStatus.ACCEPTED &&
      matchDetail.data?.challengerMap?.name === UNSET_MAP_NAME
    ) {
      if (!pollingInterval.current) {
        pollingInterval.current = setInterval(() => {
          eliminatedMaps.refetch();
        }, POLLING_INTERVAL);
      }

      return () => (pollingInterval.current ? clearInterval(pollingInterval.current) : undefined);
    }
    return () => null;
  }, [matchDetail.isFetched]);

  const refreshPage = async () => {
    await eliminatedMaps.refetch();
  };

  const adminItems: MenuProps['items'] = [
    {
      label: <FormattedMessage {...messages.resetMapPick} />,
      key: '1',
      onClick: () => setIsResetModalOpen(true),
    },
  ];

  const getMatchTypeTitle = () => {
    if (matchDetail.data?.type === MatchType.GROUP) {
      return <FormattedMessage {...messages.groupRound} values={{ value: matchDetail.data?.round ?? '' }} />;
    }

    if (matchDetail.data?.type === MatchType.PLAYOFF_FINAL) {
      return <FormattedMessage {...messages.playOffFinal} />;
    }

    if (matchDetail.data?.type === MatchType.PLAYOFF_SMALL_FINAL) {
      return <FormattedMessage {...messages.playOffSmallFinal} />;
    }

    if (matchDetail.data?.type === MatchType.PLAYOFF && matchDetail.data?.round === 1) {
      return <FormattedMessage {...messages.preRound} />;
    }

    if (matchDetail.data?.type === MatchType.PLAYOFF && matchDetail.data?.round === 2) {
      return <FormattedMessage {...messages.quarterFinal} />;
    }

    if (matchDetail.data?.type === MatchType.PLAYOFF && matchDetail.data?.round === 3) {
      return <FormattedMessage {...messages.semifinal} />;
    }
  };

  const filteredMaps =
    seasonMaps.data?.items?.filter(
      (item) =>
        item.name !== UNSET_MAP_NAME &&
        !eliminatedMaps.data?.items.find((eliminatedMap) => eliminatedMap.mapId === item.id),
    ) ?? [];
  const challengerPickedMaps =
    eliminatedMaps.data?.items?.filter((item) => {
      const playerInChallengerTeam = challengerTeamMembers.data?.items.find(
        (player) => player.user?.id === item.pickedBy,
      );

      return !!playerInChallengerTeam;
    }) ?? [];
  const opponentPickedMaps =
    eliminatedMaps.data?.items?.filter((item) => {
      const playerInOpponentTeam = opponentTeamMembers.data?.items.find((player) => player.user?.id === item.pickedBy);

      return !!playerInOpponentTeam;
    }) ?? [];

  const challengerEliminationTurn =
    matchDetail.data?.challengerMap?.name === UNSET_MAP_NAME &&
    (eliminatedMaps.data?.items?.length ?? 0) % 2 === 0 &&
    filteredMaps.length > 1;
  const opponentEliminationTurn =
    matchDetail.data?.challengerMap?.name === UNSET_MAP_NAME &&
    (eliminatedMaps.data?.items?.length ?? 0) % 2 === 1 &&
    filteredMaps.length > 1;

  const canLoggedUserPickMapNow =
    isPossibleToManageMatch.allowed &&
    ((challengerEliminationTurn && isPossibleToManageMatch.myTeamId === matchDetail.data?.challenger?.team?.id) ||
      (opponentEliminationTurn && isPossibleToManageMatch.myTeamId === matchDetail.data?.opponent?.team?.id));

  return (
    <ContentLayout
      breadcrumbItems={[
        {
          key: 'bc-league',
          onClick: () => navigate(Routes.CHAMPIONSHIP),
          title: (
            <BreadcrumbItem>
              <FormattedMessage {...messages.championshipBreadcrumb} />
            </BreadcrumbItem>
          ),
        },
        {
          key: 'bc-season',
          onClick: () => navigate(Routes.CHAMPIONSHIP_DETAIL.replace(':id', matchDetail.data?.season.id ?? '')),
          title: (
            <BreadcrumbItem>
              {matchDetail.data?.season?.name ?? <FormattedMessage {...messages.tournamentBreadcrumb} />}
            </BreadcrumbItem>
          ),
        },
        {
          key: 'bc-match',
          onClick: () => navigate(Routes.CHAMPIONSHIP_MATCH_DETAIL.replace(':matchId', query.matchId)),
          title: (
            <BreadcrumbItem>
              <FormattedMessage {...messages.matchBreadcrumb} />
            </BreadcrumbItem>
          ),
        },
        {
          key: 'bc-pick',
          title: <FormattedMessage {...messages.title} />,
        },
      ]}
    >
      <Helmet title={formatMessage(messages.title)} />
      <Flex align="center" justify="space-between">
        <H1>
          <FormattedMessage {...messages.title} />
        </H1>
        {userIsAdmin && (
          <Dropdown menu={{ items: adminItems }}>
            <Button>
              <FormattedMessage {...messages.admin} />
            </Button>
          </Dropdown>
        )}
      </Flex>
      <Divider style={{ marginTop: 0 }} />
      {showLoading && <Spin size="large" />}
      <EaseInOutContainer isOpen={!showLoading}>
        <S.Container>
          <Card>
            <Flex justify="space-between">
              <div style={{ flex: 1, textAlign: 'start' }}>
                <S.InformationLabel>
                  <FormattedMessage {...messages.date} />
                </S.InformationLabel>
                <br />
                <S.InformationValue>{formatDateForUser(matchDetail.data?.startDate)}</S.InformationValue>
              </div>
              <div style={{ flex: 1, textAlign: 'end' }}>
                <S.MatchType>{getMatchTypeTitle()}</S.MatchType>
                <Button onClick={refreshPage}>
                  <FormattedMessage {...messages.refreshPage} />
                </Button>
              </div>
            </Flex>
            <Gap defaultHeight={32} />
            {filteredMaps.length === 1 && (
              <>
                <S.InformationLabel>
                  <FormattedMessage {...messages.chosenMap} />
                </S.InformationLabel>
                <br />
                <S.InformationValue style={{ fontSize: 30 }}>{filteredMaps?.[0]?.name}</S.InformationValue>
              </>
            )}
            {(challengerEliminationTurn || opponentEliminationTurn) && (
              <>
                <S.InformationLabel>
                  <FormattedMessage {...messages.pickingTurn} />
                </S.InformationLabel>
                <br />
                <S.InformationValue
                  style={{ color: canLoggedUserPickMapNow ? theme.colors.green : theme.colors.red, fontSize: 30 }}
                >
                  {challengerEliminationTurn && matchDetail.data?.challenger?.team?.name}
                  {opponentEliminationTurn && matchDetail.data?.opponent?.team?.name}
                </S.InformationValue>
              </>
            )}
            <Gap defaultHeight={16} />
            {filteredMaps.length > 1 && (
              <>
                <Flex align="flex-start" vertical>
                  <S.Subtitle>
                    <FormattedMessage {...messages.mapsToEliminate} />
                  </S.Subtitle>
                  <Gap defaultHeight={16} height={{ md: 8 }} />
                  <S.MapTags>
                    {filteredMaps.map((item) => {
                      return (
                        <S.Tag
                          style={{
                            cursor: canLoggedUserPickMapNow ? 'pointer' : 'not-allowed',
                          }}
                          onClick={() => {
                            if (canLoggedUserPickMapNow) {
                              setPickMapModalState({ isOpen: true, id: item.id, name: item.name });
                            }
                          }}
                        >
                          {item.name}
                        </S.Tag>
                      );
                    })}
                  </S.MapTags>
                </Flex>
                <Gap defaultHeight={32} />
              </>
            )}
            <Flex align="flex-start" vertical>
              <S.Subtitle>
                <FormattedMessage
                  {...messages.mapsEliminatedBy}
                  values={{ value: matchDetail.data?.challenger?.team?.name ?? '' }}
                />
              </S.Subtitle>
              <Gap defaultHeight={16} height={{ md: 8 }} />
              <S.MapTags>
                {challengerPickedMaps.length === 0 && <FormattedMessage {...messages.nothingPickedYet} />}
                {challengerPickedMaps.map((item) => {
                  console.log(item);
                  const map = seasonMaps.data?.items?.find((map) => map.id === item.mapId);
                  console.log(map);
                  console.log(seasonMaps.data);
                  if (!map) {
                    return null;
                  }
                  return <S.Tag style={{ backgroundColor: theme.colors.green }}>{map?.name}</S.Tag>;
                })}
              </S.MapTags>
            </Flex>
            <Gap defaultHeight={32} />
            <Flex align="flex-start" vertical>
              <S.Subtitle>
                <FormattedMessage
                  {...messages.mapsEliminatedBy}
                  values={{ value: matchDetail.data?.opponent?.team?.name ?? '' }}
                />
              </S.Subtitle>
              <Gap defaultHeight={16} height={{ md: 8 }} />
              <S.MapTags>
                {opponentPickedMaps.length === 0 && <FormattedMessage {...messages.nothingPickedYet} />}
                {opponentPickedMaps.map((item) => {
                  const map = seasonMaps.data?.items?.find((map) => map.id === item.mapId);
                  if (!map) {
                    return null;
                  }
                  return <S.Tag style={{ backgroundColor: theme.colors.red }}>{map?.name}</S.Tag>;
                })}
              </S.MapTags>
            </Flex>
          </Card>
        </S.Container>
      </EaseInOutContainer>
      <ResetMapPickModal isOpen={isResetModalOpen} onClose={() => setIsResetModalOpen(false)} matchId={query.matchId} />
      <EliminateMapModal
        matchId={query.matchId}
        config={pickMapModalState}
        onClose={() => setPickMapModalState(INITAL_MODAL_STATE)}
      />
    </ContentLayout>
  );
};
