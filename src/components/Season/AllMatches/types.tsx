import { ReactNode } from 'react';

import { faHandshake } from '@fortawesome/free-solid-svg-icons/faHandshake';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TableColumnsType, Tag } from 'antd';
import { FormattedMessage } from 'react-intl';

import { IMatchPlayer } from '../../../api/hooks/league/interfaces';
import { MatchStatus, PlayersCount } from '../../../constants/enums';
import { mapNumberOfPlayersToTranslation } from '../../../utils/mappingLabelUtils';
import { Gap } from '../../Gap/Gap';

import { messages } from './messages';

import * as S from './AllMatches.style';

export interface IMatchesTableRow {
  id: string;
  date: string;
  status: ReactNode;
  matchStatus: MatchStatus;
  result: string;
  challengerElo?: number;
  opponentElo?: number;
  challengerTeamName: string;
  opponentTeamName: string;
  maximalPlayers?: number;
  matchPlayerCountOptions?: PlayersCount[];
  hostPlayers?: IMatchPlayer[];
  challengerPlayers?: IMatchPlayer[];
  opponentPlayers?: IMatchPlayer[];
  joinPlayersCount?: number;
}

export const MATCH_COLUMNS = (
  hidden: boolean,
  showTeamNames: boolean,
  showPlayers: boolean,
  userIsAdmin = false,
): TableColumnsType<IMatchesTableRow> => {
  return [
    {
      title: <FormattedMessage {...messages.matchDate} />,
      dataIndex: 'date',
      key: '0',
      width: 190,
      defaultSortOrder: 'descend',
      hidden: showPlayers && hidden,
      render: (_, record) => {
        if (showPlayers) {
          return (
            <>
              <b>{record.date}</b>
              <br />
              <FormattedMessage
                {...messages.playersCount}
                values={{ value: `${record.joinPlayersCount ?? 0}/${record.maximalPlayers}` }}
              />
              {record.matchPlayerCountOptions &&
                record.matchStatus === MatchStatus.NEW &&
                record.matchPlayerCountOptions.length > 0 && (
                  <>
                    <br />
                    {record.matchPlayerCountOptions.map((item) => (
                      <Tag>{mapNumberOfPlayersToTranslation(item)}</Tag>
                    ))}
                  </>
                )}
            </>
          );
        }

        return record.date;
      },
    },
    {
      title: <FormattedMessage {...messages.matches} />,
      render: (_, record) => {
        const challengerEloAmountGreaterThanZero = (record?.challengerElo ?? 0) > 0;
        const challengerEloAmountLowerThanZero = (record?.challengerElo ?? 0) < 0;
        const opponentEloAmountGreaterThanZero = (record?.opponentElo ?? 0) > 0;
        const opponentEloAmountLowerThanZero = (record?.opponentElo ?? 0) < 0;
        const showElo = record.matchStatus === MatchStatus.FINISHED;

        return (
          <>
            {showPlayers && (
              <>
                <b>{record.date}</b>
                <br />
                {record.matchPlayerCountOptions &&
                  record.matchStatus === MatchStatus.NEW &&
                  record.matchPlayerCountOptions.length > 0 && (
                    <>
                      {record.matchPlayerCountOptions.map((item) => (
                        <Tag>{mapNumberOfPlayersToTranslation(item)}</Tag>
                      ))}
                      <br />
                    </>
                  )}
              </>
            )}
            {showTeamNames && (
              <>
                <b>{record.challengerTeamName}</b> - <b>{record.opponentTeamName}</b>
                <br />
              </>
            )}
            <span>
              {showElo && showTeamNames && (
                <>
                  <S.EloPoints
                    $isWinning={challengerEloAmountGreaterThanZero}
                    $isLosing={challengerEloAmountLowerThanZero}
                  >
                    ({challengerEloAmountGreaterThanZero && '+'}
                    {record.challengerElo}){' '}
                  </S.EloPoints>
                </>
              )}
              <b>{record.result}</b>
              {showElo && showTeamNames && (
                <>
                  <S.EloPoints $isWinning={opponentEloAmountGreaterThanZero} $isLosing={opponentEloAmountLowerThanZero}>
                    {' '}
                    ({opponentEloAmountGreaterThanZero && '+'}
                    {record.opponentElo})
                  </S.EloPoints>
                </>
              )}
            </span>
            <br />
            <FormattedMessage {...messages.matchStatus} />: <b>{record.status}</b>
            {showPlayers && (
              <>
                <br />
                <FormattedMessage
                  {...messages.playersCount}
                  values={{ value: `${record.joinPlayersCount ?? 0}/${record.maximalPlayers}` }}
                />
                <br />
                {record.matchStatus === MatchStatus.NEW && (
                  <>
                    {userIsAdmin ? (
                      record.hostPlayers?.map((player) => <S.Tag>{player.user.nickname}</S.Tag>)
                    ) : (
                      <FormattedMessage {...messages.playersHaveNotBeenRevealed} />
                    )}
                  </>
                )}
                {record.matchStatus !== MatchStatus.NEW && (
                  <>
                    <b>
                      <FormattedMessage {...messages.teams} />
                    </b>
                    <Gap defaultHeight={8} />
                    {record.challengerPlayers?.map((player) => (
                      <S.ChallengerTag>{player.user.nickname}</S.ChallengerTag>
                    ))}
                    <Gap defaultHeight={12} />
                    {record.opponentPlayers?.map((player) => <S.OpponentTag>{player.user.nickname}</S.OpponentTag>)}
                  </>
                )}
              </>
            )}
          </>
        );
      },
      hidden: !hidden,
    },
    {
      title: <FormattedMessage {...messages.players} />,
      dataIndex: 'players',
      key: '5',
      hidden: hidden || !showPlayers,
      render: (_, record) => {
        return (
          <>
            {record.matchStatus === MatchStatus.NEW && (
              <>
                {userIsAdmin ? (
                  record.hostPlayers?.map((player) => <S.Tag>{player.user.nickname}</S.Tag>)
                ) : (
                  <FormattedMessage {...messages.playersHaveNotBeenRevealed} />
                )}
              </>
            )}
            {record.matchStatus !== MatchStatus.NEW && (
              <>
                {record.challengerPlayers?.map((player) => <S.ChallengerTag>{player.user.nickname}</S.ChallengerTag>)}
                <Gap defaultHeight={12} />
                {record.opponentPlayers?.map((player) => <S.OpponentTag>{player.user.nickname}</S.OpponentTag>)}
              </>
            )}
          </>
        );
      },
    },
    {
      title: <FormattedMessage {...messages.challenger} />,
      dataIndex: 'challengerTeamName',
      key: '1',
      hidden: hidden || !showTeamNames,
    },
    {
      title: <FormattedMessage {...messages.opponent} />,
      dataIndex: 'opponentTeamName',
      key: '2',
      hidden: hidden || !showTeamNames,
    },
    {
      title: <FormattedMessage {...messages.result} />,
      align: 'center',
      dataIndex: 'result',
      key: '3',
      render: (_, record) => {
        const challengerEloAmountGreaterThanZero = (record?.challengerElo ?? 0) > 0;
        const challengerEloAmountLowerThanZero = (record?.challengerElo ?? 0) < 0;
        const opponentEloAmountGreaterThanZero = (record?.opponentElo ?? 0) > 0;
        const opponentEloAmountLowerThanZero = (record?.opponentElo ?? 0) < 0;
        const showElo = record.matchStatus === MatchStatus.FINISHED;
        return (
          <span>
            {showElo && showTeamNames && (
              <>
                <S.EloPoints
                  $isWinning={challengerEloAmountGreaterThanZero}
                  $isLosing={challengerEloAmountLowerThanZero}
                >
                  ({challengerEloAmountGreaterThanZero && '+'}
                  {record.challengerElo}){' '}
                </S.EloPoints>
              </>
            )}
            <b>{record.result}</b>
            {showElo && showTeamNames && (
              <>
                <S.EloPoints $isWinning={opponentEloAmountGreaterThanZero} $isLosing={opponentEloAmountLowerThanZero}>
                  {' '}
                  ({opponentEloAmountGreaterThanZero && '+'}
                  {record.opponentElo})
                </S.EloPoints>
              </>
            )}
          </span>
        );
      },
      hidden,
    },
    {
      align: 'center',
      title: <FormattedMessage {...messages.matchStatus} />,
      dataIndex: 'status',
      key: '4',
      hidden,
    },
  ];
};

export interface ILadderTableRow {
  id: string;
  position: number;
  name: string;
  countOfMatches: number;
  wins: number;
  draws: number;
  loses: number;
  eloPoints: number;
  seasonTeamId: string;
}

export const LADDER_COLUMNS = (
  showShortLabels: boolean,
  canUserManageMatch: boolean,
  goToCreateMatch?: (id: string) => void,
  myTeamId?: string,
): TableColumnsType<ILadderTableRow> => {
  return [
    {
      title: <FormattedMessage {...messages.teamPosition} />,
      dataIndex: 'position',
      key: '0',
      defaultSortOrder: 'descend',
      align: 'center',
    },
    {
      title: <FormattedMessage {...messages.teamMobile} />,
      hidden: !showShortLabels,
      render: (_, item) => {
        return (
          <>
            <b>{item?.name}</b>
            <br />
            <S.LadderTableLabel>
              <FormattedMessage {...messages.points} />:{' '}
            </S.LadderTableLabel>
            <S.LadderTableValue>{item.eloPoints}</S.LadderTableValue>
            <br />
            <S.LadderTableLabel>
              <FormattedMessage {...messages.wins} />:{' '}
            </S.LadderTableLabel>
            <S.LadderTableValue>{item.wins}</S.LadderTableValue>
            <br />
            <S.LadderTableLabel>
              <FormattedMessage {...messages.draws} />:{' '}
            </S.LadderTableLabel>
            <S.LadderTableValue>{item.draws}</S.LadderTableValue>
            <br />
            <S.LadderTableLabel>
              <FormattedMessage {...messages.loses} />:{' '}
            </S.LadderTableLabel>
            <S.LadderTableValue>{item.loses}</S.LadderTableValue>
          </>
        );
      },
    },
    { title: <FormattedMessage {...messages.teamName} />, dataIndex: 'name', key: '1', hidden: showShortLabels },
    {
      title: <FormattedMessage {...messages.countOfMatches} />,
      dataIndex: 'countOfMatches',
      key: '2',
      align: 'center',
      hidden: showShortLabels,
      sorter: (a, b) => b.countOfMatches - a.countOfMatches,
    },
    {
      title: <FormattedMessage {...messages.winsShortcut} />,
      dataIndex: 'wins',
      key: '3',
      align: 'center',
      hidden: showShortLabels,
      sorter: (a, b) => b.wins - a.wins,
    },
    {
      title: <FormattedMessage {...messages.drawsShortcut} />,
      dataIndex: 'draws',
      align: 'center',
      key: '4',
      hidden: showShortLabels,
      sorter: (a, b) => b.draws - a.draws,
      responsive: ['md'],
    },
    {
      title: <FormattedMessage {...messages.losesShortcut} />,
      dataIndex: 'loses',
      align: 'center',
      key: '5',
      hidden: showShortLabels,
      sorter: (a, b) => b.loses - a.loses,
    },
    {
      title: <FormattedMessage {...messages.points} />,
      dataIndex: 'eloPoints',
      align: 'center',
      key: '7',
      hidden: showShortLabels,
      sorter: (a, b) => b.eloPoints - a.eloPoints,
    },
    {
      title: <FormattedMessage {...messages.actions} />,
      dataIndex: '',
      key: '8',
      align: 'center',
      hidden: !canUserManageMatch,
      render: (_, record) => {
        return (
          <S.Icons>
            {record.id !== myTeamId && canUserManageMatch ? (
              <FontAwesomeIcon
                icon={faHandshake}
                onClick={(e) => {
                  e.stopPropagation();
                  goToCreateMatch?.(record.seasonTeamId);
                }}
              />
            ) : (
              <div style={{ width: 22.5 }} />
            )}
          </S.Icons>
        );
      },
    },
  ];
};
