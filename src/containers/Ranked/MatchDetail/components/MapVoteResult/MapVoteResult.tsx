import React from 'react';

import { Flex, Progress } from 'antd';
import { FormattedMessage } from 'react-intl';

import { IMap } from '../../../../../api/hooks/interfaces';
import { IVoteItem } from '../../../../../api/hooks/ranked/interfaces';
import { Gap } from '../../../../../components/Gap/Gap';

import { messages } from './messages';

import * as S from './MapVoteResult.style';

interface IProps {
  maps: IMap[];
  mapVotes: IVoteItem[];
  totalVotes: number;
}

export const MapVoteResult: React.FC<IProps> = (props: IProps) => {
  const { maps, mapVotes, totalVotes } = props;

  return (
    <>
      <Flex align="flex-start" vertical>
        <S.Subtitle>
          <FormattedMessage {...messages.title} />
        </S.Subtitle>
        <Gap defaultHeight={8} />
        <S.MapVotes>
          {mapVotes.map((item) => {
            const mapById = maps.find((map) => map.id === item.mapId);

            return (
              <S.MapVote>
                {mapById?.name ?? ''} ({item.count}/{totalVotes})
                <Progress
                  percent={Number(item.percentage)}
                  percentPosition={{ align: 'end', type: 'inner' }}
                  size={['100%', 30]}
                />
              </S.MapVote>
            );
          })}
        </S.MapVotes>
      </Flex>
      <Gap defaultHeight={32} />
    </>
  );
};
