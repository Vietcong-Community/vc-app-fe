import React, { useState } from 'react';

import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

import { ITeam } from '../../../../../api/hooks/teams/interfaces';
import { AnimatedHeightContainer } from '../../../../../components/Animations/AnimatedHeightContainer/AnimatedHeightContainer';
import { Card } from '../../../../../components/Card/Card';
import { Gap } from '../../../../../components/Gap/Gap';
import { messages } from '../../messages';

import * as S from './Team.style';

interface IProps {
  team?: ITeam;
}

export const Team: React.FC<IProps> = (props: IProps) => {
  const { team } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Card style={{ textAlign: 'start' }}>
      <S.TeamInfo>
        <S.TeamLabel>{team?.name ?? ''}</S.TeamLabel>
        <S.TeamTag>{team?.tag ?? ''}</S.TeamTag>
      </S.TeamInfo>
      <Gap defaultHeight={8} />
      <S.LineUpTitle>
        <div onClick={() => setIsOpen((val) => !val)}>
          <FormattedMessage {...messages.lineup} />
        </div>
        <S.Icon onClick={() => setIsOpen((val) => !val)}>{isOpen ? <UpOutlined /> : <DownOutlined />}</S.Icon>
      </S.LineUpTitle>
      <AnimatedHeightContainer isOpen={isOpen}>
        <Gap defaultHeight={16} />
        <FormattedMessage {...messages.lineupTBA} />
      </AnimatedHeightContainer>
    </Card>
  );
};
