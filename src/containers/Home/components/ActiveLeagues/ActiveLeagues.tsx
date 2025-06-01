import React from 'react';

import { Spin, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useLeaguesWithSeasonsList } from '../../../../api/hooks/league/api';
import { Gap } from '../../../../components/Gap/Gap';
import { SeasonType } from '../../../../constants/enums';
import { ActiveSeasonBox } from '../ActiveSeasonBox/ActiveSeasonBox';

import { messages } from './messages';

import * as S from './ActiveLeagues.style';

export const ActiveLeagues: React.FC = () => {
  const leaguesWithSeasons = useLeaguesWithSeasonsList([SeasonType.SEASON, SeasonType.FACEIT]);

  return (
    <>
      {leaguesWithSeasons.isLoading && (
        <>
          <Gap defaultHeight={36} />
          <Spin size="large" />
        </>
      )}
      <Typography.Title level={3}>
        <FormattedMessage {...messages.title} />
      </Typography.Title>
      <S.ActiveSeasons>
        {leaguesWithSeasons.data?.map((league) => (
          <ActiveSeasonBox
            key={`${league.league.id}-active-season`}
            leagueDetail={league.league}
            seasons={league.seasons}
          />
        ))}
      </S.ActiveSeasons>
    </>
  );
};
