import React from 'react';

import { Tabs, Typography } from 'antd';

import { ILeagueDetail, ISeason } from '../../../../../api/hooks/league/interfaces';
import { Divider } from '../../../../../components/Divider/Divider';
import { Gap } from '../../../../../components/Gap/Gap';
import { SeasonStatus } from '../../../../../constants/enums';
import { mapSeasonStatusToTranslation } from '../../../../../utils/mappingLabelUtils';
import { SeasonPreview } from '../SeasonPreview/SeasonPreview';

import * as S from './LeaguePreview.style';

interface IProps {
  leagueDetail: ILeagueDetail;
  seasons: ISeason[];
}

export const LeaguePreview: React.FC<IProps> = (props: IProps) => {
  const { leagueDetail, seasons } = props;

  const activeSeasonIndex = seasons.findIndex((item) => item.status === SeasonStatus.ACTIVE);

  return (
    <S.Container>
      <Typography.Text>{leagueDetail.description}</Typography.Text>
      <Gap defaultHeight={16} />
      <Divider />
      <Gap defaultHeight={16} />
      <Tabs
        defaultActiveKey={`tab-season-${activeSeasonIndex + 1}`}
        destroyInactiveTabPane
        items={seasons.map((season: ISeason, index: number) => {
          return {
            key: `tab-season-${index + 1}`,
            label: (
              <S.TabLabel>
                <S.TabTag $isActive={season.status === SeasonStatus.ACTIVE}>
                  {mapSeasonStatusToTranslation(season.status)}
                </S.TabTag>
                {season.name}
              </S.TabLabel>
            ),
            children: <SeasonPreview key={`tab-season-${index + 1}`} seasonDetail={season} />,
          };
        })}
      />
    </S.Container>
  );
};
