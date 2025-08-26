import React from 'react';

import { ILeagueDetail, ISeason } from '../../../../../api/hooks/league/interfaces';
import { Gap } from '../../../../../components/Gap/Gap';
import { ChampionshipPreview } from '../ChampionshipPreview/ChampionshipPreview';

interface IProps {
  leagueDetail: ILeagueDetail;
  seasons: ISeason[];
  userIsAdmin?: boolean;
}

export const LeaguePreview: React.FC<IProps> = (props: IProps) => {
  const { seasons, userIsAdmin } = props;

  return (
    <>
      <Gap defaultHeight={16} />
      {seasons?.map((item: ISeason, index) => {
        const isLast = index === seasons?.length - 1;
        if (item.type === 'TOURNAMENT_DE' && !userIsAdmin) {
          return null;
        }

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
