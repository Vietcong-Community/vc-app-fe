import React from 'react';

import { Modal } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { useRemoveRound } from '../../../../../api/hooks/league/api';

import { messages } from './messages';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  roundId: string;
}
export const RemoveRoundModal: React.FC<IProps> = (props: IProps) => {
  const { isOpen, onClose, roundId } = props;
  const { formatMessage } = useIntl();
  const removeRound = useRemoveRound(roundId);

  return (
    <Modal
      title={<FormattedMessage {...messages.title} />}
      cancelButtonProps={{ title: formatMessage(messages.cancel) }}
      okButtonProps={{ title: formatMessage(messages.confirm) }}
      onCancel={onClose}
      confirmLoading={removeRound.isPending}
      open={isOpen}
    >
      <FormattedMessage {...messages.description} values={{ value: roundId }} />
    </Modal>
  );
};
