import React from 'react';

import { Modal, Spin } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useMapsInSeason } from '../../../api/hooks/league/api';
import { Gap } from '../../Gap/Gap';

import { messages } from './messages';

interface IProps {
  closeModal: () => void;
  isOpen: boolean;
  seasonId: string;
}

export const SeasonMapListModal: React.FC<IProps> = (props: IProps) => {
  const { closeModal, isOpen, seasonId } = props;

  const seasonMaps = useMapsInSeason(seasonId, isOpen);

  return (
    <Modal
      cancelButtonProps={{ style: { display: 'none' } }}
      title={<FormattedMessage {...messages.title} />}
      onCancel={closeModal}
      onOk={closeModal}
      open={isOpen}
      width={350}
    >
      {seasonMaps.isLoading && (
        <>
          <Gap defaultHeight={16} />
          <Spin />
        </>
      )}
      {seasonMaps.data?.items?.map((item, index) => {
        const isLast = index + 1 === seasonMaps.data?.items?.length;

        return (
          <>
            {item.name}
            {!isLast && <Gap defaultHeight={4} />}
          </>
        );
      })}
    </Modal>
  );
};
