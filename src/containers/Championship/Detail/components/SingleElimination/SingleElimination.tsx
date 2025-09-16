import React, { useMemo } from 'react';

import { groupBy } from 'lodash';
import isNil from 'lodash/isNil';
import { FormattedMessage } from 'react-intl';

import { useSeasonMatchList } from '../../../../../api/hooks/league/api';
import { AnimatedHeightContainer } from '../../../../../components/Animations/AnimatedHeightContainer/AnimatedHeightContainer';
import { Collapse } from '../../../../../components/Collapse/Collapse';
import { Divider } from '../../../../../components/Divider/Divider';
import { H2 } from '../../../../../components/Titles/H2/H2';
import { RoundColumn } from '../../../../../components/Tournament/RoundColumn/RoundColumn';
import { MatchType } from '../../../../../constants/enums';

import { messages } from './messages';

import * as S from './SingleElimination.style';

interface IProps {
  teamsCount: number;
  seasonId: string;
}

export const SingleElimination: React.FC<IProps> = (props: IProps) => {
  const { teamsCount, seasonId } = props;

  const matches = useSeasonMatchList(seasonId, {
    page: 1,
    limit: 50,
    types: [MatchType.PLAYOFF, MatchType.PLAYOFF_SMALL_FINAL, MatchType.PLAYOFF_FINAL].toString(),
  });

  const roundCount = Math.ceil(Math.log2(teamsCount));
  const groupedMatches = groupBy(matches.data?.matches, 'round');
  const rounds = useMemo(() => Array.from({ length: roundCount }, (_, index) => index + 1), [roundCount]);

  return (
    <AnimatedHeightContainer isOpen={matches.isFetched && matches.data?.total !== 0}>
      <Collapse
        defaultOpen={false}
        title={
          <H2>
            <FormattedMessage {...messages.title} />
          </H2>
        }
      >
        <S.Container>
          <S.Content>
            {rounds.map((roundNumber: number) => {
              let roundMatches = groupedMatches[roundNumber];

              // HARDCODED, SHOULD BE FIXED ON BE
              if (roundNumber === 1 && !isNil(roundMatches)) {
                roundMatches = roundMatches.filter((item) => item.id !== 'dff132f7-1acc-46e2-953a-aab300e676f4');
                const matchToFill = groupedMatches[roundNumber].find(
                  (item) => item.id === 'dff132f7-1acc-46e2-953a-aab300e676f4',
                );
                if (matchToFill) {
                  roundMatches.push(matchToFill);
                }
              }

              return <RoundColumn roundCount={roundCount} roundNumber={roundNumber} matches={roundMatches} />;
            })}
          </S.Content>
        </S.Container>
        <Divider style={{ margin: '16px 0' }} />
      </Collapse>
    </AnimatedHeightContainer>
  );
};
