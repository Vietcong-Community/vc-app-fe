import React from 'react';

import { Button, Dropdown, MenuProps } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useRouter } from '../../../../../hooks/RouterHook';
import { Routes } from '../../../../../routes/enums';

import { messages } from './messages';

interface IProps {
  setOpenSeasonMapsModal: (value: boolean) => void;
  seasonId: string;
}

export const AdminMenu: React.FC<IProps> = (props: IProps) => {
  const { seasonId, setOpenSeasonMapsModal } = props;
  const { navigate } = useRouter<{ id: string }>();

  const onConfirmMatch = async () => {
    navigate(Routes.ADMIN_CREATE_MATCH.replace(':seasonId', seasonId));
  };

  const items: MenuProps['items'] = [
    {
      label: <FormattedMessage {...messages.createMatch} />,
      key: '1',
      onClick: onConfirmMatch,
    },
    {
      label: <FormattedMessage {...messages.setSeasonMaps} />,
      key: '2',
      onClick: () => setOpenSeasonMapsModal(true),
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <Button>
        <FormattedMessage {...messages.menuLabel} />
      </Button>
    </Dropdown>
  );
};
