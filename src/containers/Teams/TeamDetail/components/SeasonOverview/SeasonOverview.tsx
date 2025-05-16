import React from 'react';

import { FormattedMessage } from 'react-intl';

import { ISeason } from '../../../../../api/hooks/league/interfaces';
import { Gap } from '../../../../../components/Gap/Gap';
import { Statistics } from '../../../../../components/Season/Statistics/Statistics';
import { useRouter } from '../../../../../hooks/RouterHook';
import { Routes } from '../../../../../routes/enums';
import { Matches } from '../Matches/Matches';

import { messages } from './messages';

import * as S from './SeasonOverview.style';

interface IProps {
  teamId: string;
  season: ISeason;
}

export const SeasonOverview: React.FC<IProps> = (props: IProps) => {
  const { teamId, season } = props;
  const { navigate } = useRouter();

  return (
    <>
      <S.SeasonTitle onClick={() => navigate(Routes.SEASON_DETAIL.replace(':seasonId', season.id))}>
        {season.name}
      </S.SeasonTitle>
      <Gap defaultHeight={8} />
      <Statistics
        customTitle={
          <S.SubTitle>
            <FormattedMessage {...messages.statistics} />
          </S.SubTitle>
        }
        defaultTeamId={teamId}
        seasonId={season.id}
        showPlayersFilter={false}
        showTeamFilter={false}
      />
      <Gap defaultHeight={8} />
      <S.SubTitle>
        <FormattedMessage {...messages.matches} />
      </S.SubTitle>
      <Matches teamId={teamId} seasonId={season.id} />
    </>
  );
};
