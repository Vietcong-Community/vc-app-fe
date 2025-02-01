import React, { useMemo } from 'react';

import { Modal } from 'antd';
import { forOwn } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { useExpectedEloPoints } from '../../../../../api/hooks/league/api';
import { IExpectedEloPointsItem } from '../../../../../api/hooks/league/interfaces';
import { Table } from '../../../../../components/Table/Table';

import { messages } from './messages';
import { ELO_POINTS_COLUMNS, IEloPointsRow } from './types';

interface IProps {
  challengerId?: string;
  challengerName?: string;
  closeModal: () => void;
  isOpen: boolean;
  opponentId?: string;
  opponentName?: string;
}

export const ExpectedEloPointsModal: React.FC<IProps> = (props: IProps) => {
  const { challengerId, challengerName, closeModal, isOpen, opponentId, opponentName } = props;
  const expectedEloPoints = useExpectedEloPoints(challengerId, opponentId, isOpen);

  const data: IEloPointsRow[] = useMemo(() => {
    const result: IEloPointsRow[] = [];
    if (!expectedEloPoints.isLoading) {
      forOwn(expectedEloPoints.data?.items, (value: IExpectedEloPointsItem, key: string) => {
        result.push({
          result: key,
          challengerPoints: value.pointsChangeChallenger,
          opponentPoints: value.pointsChangeOpponent,
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
      <Table
        columns={ELO_POINTS_COLUMNS(challengerName, opponentName)}
        data={data}
        loading={expectedEloPoints.isLoading}
        pagination={{ hideOnSinglePage: true, pageSize: 20 }}
        style={{ width: '100%' }}
      />
    </Modal>
  );
};
