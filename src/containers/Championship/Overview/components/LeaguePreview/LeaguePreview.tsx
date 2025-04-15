import React from 'react';

import { ILeagueDetail, ISeason } from '../../../../../api/hooks/league/interfaces';
import { Gap } from '../../../../../components/Gap/Gap';
import { ChampionshipPreview } from '../ChampionshipPreview/ChampionshipPreview';

interface IProps {
  leagueDetail: ILeagueDetail;
  seasons: ISeason[];
}

export const LeaguePreview: React.FC<IProps> = (props: IProps) => {
  const { seasons } = props;

  return (
    <>
      <Gap defaultHeight={16} />
      {seasons?.map((item: ISeason, index) => {
        const isLast = index === seasons?.length - 1;
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
