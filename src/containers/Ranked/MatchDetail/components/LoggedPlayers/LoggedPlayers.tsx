import React from 'react';

import { UserOutlined } from '@ant-design/icons';
import { faCrown } from '@fortawesome/free-solid-svg-icons/faCrown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Flex } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { IUser } from '../../../../../api/hooks/interfaces';
import { IMatchPlayer } from '../../../../../api/hooks/league/interfaces';
import { Gap } from '../../../../../components/Gap/Gap';
import { Routes } from '../../../../../routes/enums';

import { messages } from './messages';

import * as S from './LoggedPlayers.style';

interface IProps {
  matchOwner?: IUser;
  players: IMatchPlayer[];
}

export const LoggedPlayers: React.FC<IProps> = (props: IProps) => {
  const { matchOwner, players } = props;

  return (
    <>
      <Flex align="flex-start" vertical>
        <S.Subtitle>
          <FormattedMessage {...messages.loggedPlayers} /> ({players.length ?? 0})
        </S.Subtitle>
        <Gap defaultHeight={8} />
        <S.PlayerTags>
          {players.map((item) => {
            const isPlayerMatchOwner = item.user.id === matchOwner?.id;

            console.log(matchOwner?.id);

            return (
              <Link to={Routes.USER_PROFILE.replace(':id', item.user.id)}>
                <S.Tag>
                  {isPlayerMatchOwner && <FontAwesomeIcon icon={faCrown} style={{ marginRight: 8, fontSize: 16 }} />}
                  <Avatar
                    size={24}
                    shape="square"
                    icon={item.user?.image?.url ? <img src={item.user.image.url} alt="" /> : <UserOutlined />}
                    style={{ marginRight: 8 }}
                  />
                  {item.user.nickname}
                </S.Tag>
              </Link>
            );
          })}
        </S.PlayerTags>
      </Flex>
    </>
  );
};
