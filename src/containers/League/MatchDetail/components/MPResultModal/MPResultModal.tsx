import React, { useEffect, useState } from 'react';

import { Modal } from 'antd';
import { FormattedMessage } from 'react-intl';

import { Gap } from '../../../../../components/Gap/Gap';

import { messages } from './messages';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  url?: string;
}

export const MPResultModal: React.FC<IProps> = (props: IProps) => {
  const { isOpen, onClose, url } = props;
  const [content, setContent] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen && url) {
      fetch(url).then((response) =>
        response.text().then((text) => {
          const lines = text.split('\n');
          setContent(lines);
        }),
      );
    }
  }, [isOpen]);

  return (
    <Modal
      title={<FormattedMessage {...messages.title} />}
      cancelButtonProps={{ style: { display: 'none' } }}
      onOk={onClose}
      open={isOpen}
    >
      <FormattedMessage {...messages.url} /> {url ?? ''}
      <Gap defaultHeight={16} />
      {content.map((item) => item)}
    </Modal>
  );
};
