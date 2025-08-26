import React from 'react';

import { Flex } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useSeasonMatchList } from '../../../../../api/hooks/league/api';
import { AnimatedHeightContainer } from '../../../../../components/Animations/AnimatedHeightContainer/AnimatedHeightContainer';
import { Divider } from '../../../../../components/Divider/Divider';
import { Gap } from '../../../../../components/Gap/Gap';
import { H2 } from '../../../../../components/Titles/H2/H2';
import { MatchType } from '../../../../../constants/enums';
import { MatchCard } from '../MatchCard/MatchCard';

import { messages } from './messages';

import * as S from './PlayOff.style';

interface IProps {
  seasonId: string;
}

export const PlayOff: React.FC<IProps> = (props: IProps) => {
  const { seasonId } = props;

  const matches = useSeasonMatchList(seasonId, {
    page: 1,
    limit: 50,
    types: [MatchType.PLAYOFF, MatchType.PLAYOFF_SMALL_FINAL, MatchType.PLAYOFF_FINAL].toString(),
  });

  const preRound = matches.data?.matches.filter((item) => item.round === 1) ?? [];
  const quarterFinal = matches.data?.matches.filter((item) => item.round === 2) ?? [];
  const semiFinal = matches.data?.matches.filter((item) => item.round === 3) ?? [];
  const smallFinal =
    matches.data?.matches.filter((item) => item.round === 4 && item.type === MatchType.PLAYOFF_SMALL_FINAL) ?? [];
  const final = matches.data?.matches.filter((item) => item.round === 4 && item.type === MatchType.PLAYOFF_FINAL) ?? [];

  return (
    <AnimatedHeightContainer isOpen={matches.isFetched && matches.data?.total !== 0}>
      <Flex vertical align="flex-start">
        <H2>
          <FormattedMessage {...messages.title} />
        </H2>
        {preRound.length > 0 && (
          <>
            <FormattedMessage {...messages.preRound} />
            <S.MatchContainer>
              {preRound.map((item) => {
                return <MatchCard key={item.id} match={item} />;
              })}
            </S.MatchContainer>
          </>
        )}
        {quarterFinal.length > 0 && (
          <>
            <Gap defaultHeight={32} />
            <FormattedMessage {...messages.quarterFinal} />
            <S.MatchContainer>
              {quarterFinal.map((item) => {
                return <MatchCard key={item.id} match={item} />;
              })}
            </S.MatchContainer>
          </>
        )}
        {semiFinal.length > 0 && (
          <>
            <Gap defaultHeight={32} />
            <FormattedMessage {...messages.semifinal} />
            <S.MatchContainer>
              {semiFinal.map((item) => {
                return <MatchCard key={item.id} match={item} />;
              })}
            </S.MatchContainer>
          </>
        )}
        {smallFinal.length > 0 && (
          <>
            <Gap defaultHeight={32} />
            <FormattedMessage {...messages.playOffSmallFinal} />
            <S.MatchContainer>
              {smallFinal.map((item) => {
                return <MatchCard key={item.id} match={item} />;
              })}
            </S.MatchContainer>
          </>
        )}
        {final.length > 0 && (
          <>
            <Gap defaultHeight={32} />
            <FormattedMessage {...messages.playOffFinal} />
            <S.MatchContainer>
              {final.map((item) => {
                return <MatchCard key={item.id} match={item} />;
              })}
            </S.MatchContainer>
          </>
        )}
      </Flex>
      <Divider style={{ margin: '16px 0' }} />
    </AnimatedHeightContainer>
  );
};
