import React from 'react';

import { UserOutlined } from '@ant-design/icons';
import { Avatar, Flex } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { IMatchPlayer } from '../../../../../api/hooks/league/interfaces';
import { Gap } from '../../../../../components/Gap/Gap';
import { Routes } from '../../../../../routes/enums';

import { messages } from './messages';

import * as S from './LoggedPlayers.style';

interface IProps {
  players: IMatchPlayer[];
}

export const LoggedPlayers: React.FC<IProps> = (props: IProps) => {
  const { players } = props;

  return (
    <>
      <Flex align="flex-start" vertical>
        <S.Subtitle>
          <FormattedMessage {...messages.loggedPlayers} />
        </S.Subtitle>
        <Gap defaultHeight={8} />
        <S.PlayerTags>
          {players.map((item) => {
            return (
              <Link to={Routes.USER_PROFILE.replace(':id', item.user.id)}>
                <S.Tag>
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
      <Gap defaultHeight={32} />
    </>
  );
};
