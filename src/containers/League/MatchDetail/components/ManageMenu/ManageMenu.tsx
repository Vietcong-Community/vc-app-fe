import React from 'react';

import { Button, Dropdown, MenuProps } from 'antd';
import { FormattedMessage } from 'react-intl';

import { MatchStatus } from '../../../../../constants/enums';
import { useRouter } from '../../../../../hooks/RouterHook';
import { Routes } from '../../../../../routes/enums';

import { messages } from './messages';

interface IProps {
  matchId: string;
  status?: MatchStatus;
}

export const ManageMenu: React.FC<IProps> = (props: IProps) => {
  const { matchId, status } = props;
  const { navigate } = useRouter<{ id: string }>();

  const onConfirmMatch = async () => {
    navigate(Routes.MATCH_CHALLENGE.replace(':matchId', matchId));
  };

  const items: MenuProps['items'] = [
    {
      label: <FormattedMessage {...messages.confirmTheMatch} />,
      key: '1',
      onClick: onConfirmMatch,
      disabled: status !== MatchStatus.NEW,
    },
    {
      label: <FormattedMessage {...messages.enterTheResult} />,
      key: '2',
      onClick: () => navigate(Routes.SET_MATCH_SCORE.replace(':matchId', matchId)),
      disabled: status !== MatchStatus.ACCEPTED,
    },

    {
      label: <FormattedMessage {...messages.confirmTheResult} />,
      key: '3',
      onClick: () => navigate(Routes.CONFIRM_MATCH_SCORE.replace(':matchId', matchId)),
      disabled: status !== MatchStatus.WAITING_FOR_SCORE_CONFIRMATION,
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
