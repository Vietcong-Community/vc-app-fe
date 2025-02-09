import { ReactNode } from 'react';

import { TableColumnsType } from 'antd';
import { FormattedMessage } from 'react-intl';

import { MatchResult, MatchStatus } from '../../../../../constants/enums';
import { mapMatchResultToTranslation } from '../../../../../utils/mappingLabelUtils';

import { messages } from './messages';

import * as S from './Matches.style';

export interface IMatchesTableRow {
  id: string;
  date: string;
  status: ReactNode;
  matchStatus: MatchStatus;
  result?: MatchResult;
  points?: number;
  score: string;
  opponentTeamName?: string;
}

export const MATCH_COLUMNS = (hidden: boolean): TableColumnsType<IMatchesTableRow> => {
  return [
    { title: <FormattedMessage {...messages.matchDate} />, dataIndex: 'date', key: '0', defaultSortOrder: 'descend' },
    {
      title: <FormattedMessage {...messages.matches} />,
      render: (_, record) => {
        const eloAmountGreaterThanZero = (record?.points ?? 0) > 0;
        const eloAmountLowerThanZero = (record?.points ?? 0) < 0;
        const showPoints = record.matchStatus === MatchStatus.FINISHED;

        return (
          <>
            {record.result ? (
              <>
                <S.Tag $result={record.result}>{mapMatchResultToTranslation(record.result)}</S.Tag>
                <br />
              </>
            ) : (
              '-'
            )}
            <FormattedMessage {...messages.opponent} />: <b>{record.opponentTeamName}</b>
            <br />
            <FormattedMessage {...messages.result} />: <b>{record.score}</b>
            {showPoints && (
              <>
                <br />
                <FormattedMessage {...messages.points} />:{' '}
                <S.EloPoints $isWinning={eloAmountGreaterThanZero} $isLosing={eloAmountLowerThanZero}>
                  ({eloAmountGreaterThanZero && '+'}
                  {record.points})
                </S.EloPoints>
              </>
            )}
            <br />
            <FormattedMessage {...messages.matchStatus} />: <b>{record.status}</b>
          </>
        );
      },
      hidden: !hidden,
    },
    {
      title: <FormattedMessage {...messages.opponent} />,
      dataIndex: 'opponentTeamName',
      key: '2',
      hidden,
    },
    {
      title: <FormattedMessage {...messages.score} />,
      align: 'center',
      dataIndex: 'score',
      key: '3',
      hidden,
    },
    {
      title: <FormattedMessage {...messages.result} />,
      align: 'center',
      dataIndex: 'score',
      key: '4',
      render: (_, record) => {
        return (
          <>
            {record.result ? <S.Tag $result={record.result}>{mapMatchResultToTranslation(record.result)}</S.Tag> : '-'}
          </>
        );
      },
      hidden,
    },
    {
      title: <FormattedMessage {...messages.points} />,
      align: 'center',
      dataIndex: 'points',
      key: '5',
      render: (_, record) => {
        const eloAmountGreaterThanZero = (record?.points ?? 0) > 0;
        const eloAmountLowerThanZero = (record?.points ?? 0) < 0;
        const showPoints = record.matchStatus === MatchStatus.FINISHED;
        return (
          <>
            {showPoints ? (
              <S.EloPoints $isWinning={eloAmountGreaterThanZero} $isLosing={eloAmountLowerThanZero}>
                ({eloAmountGreaterThanZero && '+'}
                {record.points})
              </S.EloPoints>
            ) : (
              '-'
            )}
          </>
        );
      },
      hidden,
    },
    {
      align: 'center',
      title: <FormattedMessage {...messages.matchStatus} />,
      dataIndex: 'status',
      key: '6',
      hidden,
    },
  ];
};
