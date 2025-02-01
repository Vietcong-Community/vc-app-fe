import React, { useMemo } from 'react';

import { Modal } from 'antd';
import { forOwn } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { useExpectedEloPoints } from '../../../../api/hooks/league/api';
import { IExpectedEloPointsItem } from '../../../../api/hooks/league/interfaces';
import { Gap } from '../../../../components/Gap/Gap';
import { Table } from '../../../../components/Table/Table';
import { useWindowDimensions } from '../../../../hooks/WindowDimensionsHook';
import { BreakPoints } from '../../../../theme/theme';

import { messages } from './messages';
import { ELO_POINTS_COLUMNS, IEloPointsRow } from './types';

interface IProps {
  challengerId?: string;
  challengerName?: string;
  challengerElo?: number;
  closeModal: () => void;
  isOpen: boolean;
  opponentId?: string;
  opponentName?: string;
  opponentElo?: number;
}

export const ExpectedEloPointsModal: React.FC<IProps> = (props: IProps) => {
  const { challengerId, challengerName, challengerElo, closeModal, isOpen, opponentId, opponentName, opponentElo } =
    props;
  const expectedEloPoints = useExpectedEloPoints(challengerId, opponentId, isOpen);
  const { width } = useWindowDimensions();
  const isSmallerThanMD = width < BreakPoints.md;

  const data: IEloPointsRow[] = useMemo(() => {
    const result: IEloPointsRow[] = [];
    if (!expectedEloPoints.isLoading) {
      forOwn(expectedEloPoints.data?.items, (value: IExpectedEloPointsItem, key: string) => {
        result.push({
          result: key,
          newEloChallenger: value.newEloChallenger,
          challengerPoints: value.pointsChangeChallenger,
          opponentPoints: value.pointsChangeOpponent,
          newEloOpponent: value.newEloOpponent,
        });
      });
    }

    return result;
  }, [expectedEloPoints.isLoading]);

  return (
    <Modal
      title={<FormattedMessage {...messages.title} />}
      cancelButtonProps={{ style: { display: 'none' } }}
      onCancel={closeModal}
      onOk={closeModal}
      open={isOpen}
    >
      <Gap defaultHeight={16} />
      <FormattedMessage
        {...messages.actualEloPoints}
        values={{
          team: challengerName,
          tag: (msg) => <span style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{msg}</span>,
          points: challengerElo,
        }}
      />
      <Gap defaultHeight={8} />
      <FormattedMessage
        {...messages.actualEloPoints}
        values={{
          team: opponentName,
          tag: (msg) => <span style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{msg}</span>,
          points: opponentElo,
        }}
      />
      <Gap defaultHeight={16} />
      <Table
        columns={ELO_POINTS_COLUMNS(isSmallerThanMD, challengerName, opponentName)}
        data={data}
        loading={expectedEloPoints.isLoading}
        pagination={{ hideOnSinglePage: true, pageSize: 20 }}
        style={{ width: '100%' }}
      />
    </Modal>
  );
};
