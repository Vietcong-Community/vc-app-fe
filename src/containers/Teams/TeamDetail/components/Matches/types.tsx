import { ReactNode } from 'react';

import { TableColumnsType } from 'antd';
import { FormattedMessage } from 'react-intl';

import { MatchResult } from '../../../../../constants/enums';
import { mapMatchResultToTranslation } from '../../../../../utils/mappingLabelUtils';

import { messages } from './messages';

import * as S from './Matches.style';

export interface IMatchesTableRow {
  id: string;
  date: string;
  status: ReactNode;
  result?: MatchResult;
  score: string;
  opponentTeamName?: string;
}

export const MATCH_COLUMNS = (hidden: boolean): TableColumnsType<IMatchesTableRow> => {
  return [
    { title: <FormattedMessage {...messages.matchDate} />, dataIndex: 'date', key: '0', defaultSortOrder: 'descend' },
    {
      title: <FormattedMessage {...messages.matches} />,
      render: (_, record) => {
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
      key: '3',
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
      align: 'center',
      title: <FormattedMessage {...messages.matchStatus} />,
      dataIndex: 'status',
      key: '4',
      hidden,
    },
  ];
};
