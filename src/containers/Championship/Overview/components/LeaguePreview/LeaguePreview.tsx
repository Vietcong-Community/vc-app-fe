import React from 'react';

import { useSeasonsInLeague } from '../../../../../api/hooks/league/api';
import { ILeagueDetail, ISeason } from '../../../../../api/hooks/league/interfaces';
import { Gap } from '../../../../../components/Gap/Gap';
import { ChampionshipPreview } from '../ChampionshipPreview/ChampionshipPreview';

interface IProps {
  leagueDetail: ILeagueDetail;
}

export const LeaguePreview: React.FC<IProps> = (props: IProps) => {
  const { leagueDetail } = props;

  const seasons = useSeasonsInLeague(leagueDetail.id);

  return (
    <>
      <Gap defaultHeight={16} />
      {seasons.data?.items?.map((item: ISeason, index) => {
        const isLast = index === seasons.data?.items?.length - 1;
        return (
          <>
            <ChampionshipPreview seasonDetail={item} />
            {!isLast && <Gap defaultHeight={16} />}
          </>
        );
      })}
    </>
  );
};
