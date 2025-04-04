import { faCross } from '@fortawesome/free-solid-svg-icons/faCross';
import { faFlag } from '@fortawesome/free-solid-svg-icons/faFlag';
import { faSkull } from '@fortawesome/free-solid-svg-icons/faSkull';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TableColumnsType, Tooltip } from 'antd';
import { FormattedMessage } from 'react-intl';

import { messages } from './messages';

import * as S from './Statistics.style';

export interface IStatisticTableRow {
  id: string;
  nickname: string;
  totalMatches: number;
  flags: number;
  kills: number;
  deaths: number;
  kd: number;
  usefulness: number;
  averageFlags?: number;
  averageUsefulness?: number;
}

export const STATISTICS_COLUMNS = (isMobile: boolean): TableColumnsType<IStatisticTableRow> => {
  return [
    {
      title: <FormattedMessage {...messages.position} />,
      dataIndex: 'position',
      key: '0',
      defaultSortOrder: 'descend',
      align: 'center',
    },
    {
      title: <FormattedMessage {...messages.nickname} />,
      hidden: isMobile,
      key: '1',
      align: 'start',
      dataIndex: 'nickname',
    },
    {
      title: <FormattedMessage {...messages.totalMatches} />,
      dataIndex: 'totalMatches',
      key: '2',
      align: 'center',
      hidden: isMobile,
    },
    {
      title: (
        <Tooltip title={<FormattedMessage {...messages.flags} />}>
          <FontAwesomeIcon icon={faFlag} />
        </Tooltip>
      ),
      dataIndex: 'flags',
      key: '3',
      align: 'center',
      hidden: isMobile,
    },
    {
      title: (
        <Tooltip title={<FormattedMessage {...messages.kills} />}>
          <FontAwesomeIcon icon={faSkull} />
        </Tooltip>
      ),
      dataIndex: 'kills',
      key: '4',
      align: 'center',
      hidden: isMobile,
    },
    {
      title: (
        <Tooltip title={<FormattedMessage {...messages.deaths} />}>
          <FontAwesomeIcon icon={faCross} />
        </Tooltip>
      ),
      dataIndex: 'deaths',
      align: 'center',
      key: '5',
      hidden: isMobile,
    },
    {
      title: <FormattedMessage {...messages.kd} />,
      align: 'center',
      key: '6',
      hidden: isMobile,
      render: (_, item) => item.kd.toFixed(2),
    },
    {
      title: <FormattedMessage {...messages.flagsDiameter} />,
      align: 'center',
      key: '7',
      hidden: isMobile,
      render: (_, item) => item.averageFlags?.toFixed(2) ?? 0,
    },
    {
      title: <FormattedMessage {...messages.usefulness} />,
      dataIndex: 'usefulness',
      align: 'center',
      key: '8',
      hidden: isMobile,
    },
    {
      title: <FormattedMessage {...messages.usefulnessDiameter} />,
      align: 'center',
      key: '9',
      hidden: isMobile,
      render: (_, item) => item.averageUsefulness?.toFixed(2) ?? 0,
    },
    {
      title: <FormattedMessage {...messages.nickname} />,
      hidden: !isMobile,
      render: (_, item) => {
        return (
          <>
            <b>{item?.nickname}</b>
            <br />
            <span>
              <S.ValueLabel>
                <FormattedMessage {...messages.totalMatches} />:
              </S.ValueLabel>
              <S.Value> {item.totalMatches}</S.Value>
            </span>
            <br />
            <span>
              <Tooltip title={<FormattedMessage {...messages.flags} />}>
                <FontAwesomeIcon icon={faFlag} style={{ marginRight: 4 }} />
              </Tooltip>
              <S.Value> {item.flags}</S.Value>

              <Tooltip title={<FormattedMessage {...messages.kills} />}>
                <FontAwesomeIcon icon={faSkull} style={{ marginLeft: 8, marginRight: 4 }} />
              </Tooltip>
              <S.Value> {item.kills}</S.Value>

              <Tooltip title={<FormattedMessage {...messages.deaths} />}>
                <FontAwesomeIcon icon={faCross} style={{ marginLeft: 8, marginRight: 4 }} />
              </Tooltip>
              <S.Value> {item.deaths}</S.Value>
            </span>
            <br />
            <span>
              <S.ValueLabel>
                <FormattedMessage {...messages.kd} />:
              </S.ValueLabel>
              <S.Value> {item.kd.toFixed(2)}</S.Value>
            </span>
            <br />
            <span>
              <S.ValueLabel>
                <FormattedMessage {...messages.flagsDiameter} />:
              </S.ValueLabel>
              <S.Value> {item.averageFlags?.toFixed(2) ?? 0}</S.Value>
            </span>
            <br />
            <span>
              <S.ValueLabel>
                <FormattedMessage {...messages.usefulness} />:
              </S.ValueLabel>
              <S.Value> {item.usefulness}</S.Value>
            </span>
            <br />
            <span>
              <S.ValueLabel>
                <FormattedMessage {...messages.usefulnessDiameter} />:
              </S.ValueLabel>
              <S.Value> {item.averageUsefulness?.toFixed(2) ?? 0}</S.Value>
            </span>
          </>
        );
      },
    },
  ];
};
