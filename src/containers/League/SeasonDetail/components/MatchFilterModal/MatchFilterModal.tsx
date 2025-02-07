import React from 'react';

import { Modal } from 'antd';
import { FormattedMessage } from 'react-intl';

import { messages } from './messages';

interface IProps {
  closeModal: () => void;
  isOpen: boolean;
  onSubmit: () => void;
}

export const MatchFilterModal: React.FC<IProps> = (props: IProps) => {
  const { closeModal, isOpen } = props;

  return (
    <Modal title={<FormattedMessage {...messages.title} />} onCancel={closeModal} onOk={closeModal} open={isOpen}>
      test
    </Modal>
  );
};
