import React from 'react';

import { UserOutlined } from '@ant-design/icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons/faCircleXmark';
import { faCrown } from '@fortawesome/free-solid-svg-icons/faCrown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Flex } from 'antd';
import { FormattedMessage } from 'react-intl';

import { IUser } from '../../../../../api/hooks/interfaces';
import { IMatchPlayer } from '../../../../../api/hooks/league/interfaces';
import { Gap } from '../../../../../components/Gap/Gap';

import { messages } from './messages';

import * as S from './LoggedPlayers.style';

interface IProps {
  isCurrentUserOwnerOfMatch: boolean;
  matchOwner?: IUser;
  maximalPlayers: number;
  players: IMatchPlayer[];
  setRemovePlayerFromMatch: (user: IUser) => void;
  userId?: string;
  userIsAdmin?: boolean;
}

export const LoggedPlayers: React.FC<IProps> = (props: IProps) => {
  const {
    isCurrentUserOwnerOfMatch,
    matchOwner,
    maximalPlayers,
    players,
    setRemovePlayerFromMatch,
    userId,
    userIsAdmin = false,
  } = props;

  const handleOnDeleteClick = (user: IUser) => {
    setRemovePlayerFromMatch(user);
  };

  return (
    <>
      <Flex align="flex-start" vertical>
        <S.Subtitle>
          <FormattedMessage {...messages.loggedPlayers} /> ({players.length ?? 0}/{maximalPlayers})
        </S.Subtitle>
        <Gap defaultHeight={8} />
        <S.PlayerTags>
          {players.map((item) => {
            const isPlayerMatchOwner = item.user.id === matchOwner?.id;

            return (
              <S.Tag>
                {isPlayerMatchOwner && <FontAwesomeIcon icon={faCrown} style={{ marginRight: 8, fontSize: 16 }} />}
                {userIsAdmin && (
                  <Avatar
                    size={24}
                    shape="square"
                    icon={item.user?.image?.url ? <img src={item.user.image.url} alt="" /> : <UserOutlined />}
                    style={{ marginRight: 8 }}
                  />
                )}
                {userIsAdmin || userId === item.user.id ? (
                  item.user.nickname
                ) : (
                  <FormattedMessage {...messages.player} />
                )}
                {(isCurrentUserOwnerOfMatch || userIsAdmin) && userId !== item.user.id && (
                  <div
                    onClick={(event) => {
                      event.preventDefault();
                      handleOnDeleteClick(item.user);
                    }}
                  >
                    <FontAwesomeIcon icon={faCircleXmark} style={{ marginLeft: 8, fontSize: 16 }} />
                  </div>
                )}
              </S.Tag>
            );
          })}
        </S.PlayerTags>
      </Flex>
    </>
  );
};
