import { TableColumnsType } from 'antd';
import { FormattedMessage } from 'react-intl';

import { messages } from './messages';

import * as S from './ChampionshipPreview.style';

export interface ILadderTableRow {
  id: string;
  position: number;
  name: string;
  countOfMatches: number;
  wins: number;
  draws: number;
  loses: number;
  points: number;
  seasonTeamId: string;
}

export const LADDER_COLUMNS = (showShortLabels: boolean): TableColumnsType<ILadderTableRow> => {
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
            <S.LadderTableValue>{item.points}</S.LadderTableValue>
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
    },
    {
      title: <FormattedMessage {...messages.winsShortcut} />,
      dataIndex: 'wins',
      key: '3',
      align: 'center',
      hidden: showShortLabels,
    },
    {
      title: <FormattedMessage {...messages.drawsShortcut} />,
      dataIndex: 'draws',
      align: 'center',
      key: '4',
      hidden: showShortLabels,
      responsive: ['md'],
    },
    {
      title: <FormattedMessage {...messages.losesShortcut} />,
      dataIndex: 'loses',
      align: 'center',
      key: '5',
      hidden: showShortLabels,
    },
    {
      title: <FormattedMessage {...messages.points} />,
      dataIndex: 'points',
      align: 'center',
      key: '7',
      hidden: showShortLabels,
    },
  ];
};
