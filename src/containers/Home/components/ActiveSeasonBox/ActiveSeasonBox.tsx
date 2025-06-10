import React from 'react';

import { faLeftRight } from '@fortawesome/free-solid-svg-icons/faLeftRight';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons/faPeopleGroup';
import { faPerson } from '@fortawesome/free-solid-svg-icons/faPerson';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import { ILeagueDetail, ISeason } from '../../../../api/hooks/league/interfaces';
import { Gap } from '../../../../components/Gap/Gap';
import { LeagueType, SeasonStatus, SeasonType } from '../../../../constants/enums';
import { Routes } from '../../../../routes/enums';
import { mapLeagueTypeToTranslation } from '../../../../utils/mappingLabelUtils';

import * as S from './ActiveSeasonBox.style';

interface IProps {
  leagueDetail: ILeagueDetail;
  seasons: ISeason[];
}

export const ActiveSeasonBox: React.FC<IProps> = (props: IProps) => {
  const { leagueDetail, seasons } = props;

  const activeSeason = seasons.find(
    (item) =>
      (item.status === SeasonStatus.ACTIVE || item.status === SeasonStatus.NEW) &&
      (item.type === SeasonType.SEASON || item.type === SeasonType.FACEIT),
  );

  if (!activeSeason) {
    return null;
  }

  const getIcon = () => {
    if (leagueDetail.type === LeagueType.TEAMPLAY || leagueDetail.type === LeagueType.FACEIT) {
      return (
        <S.Icons>
          <FontAwesomeIcon icon={faPeopleGroup} style={{ fontSize: 20 }} />
          <FontAwesomeIcon icon={faLeftRight} />
          <FontAwesomeIcon icon={faPeopleGroup} style={{ fontSize: 20 }} />
        </S.Icons>
      );
    }

    if (leagueDetail.type === LeagueType.TWOVSTWO) {
      return (
        <S.Icons>
          <div>
            <FontAwesomeIcon icon={faPerson} style={{ fontSize: 20 }} />
            <FontAwesomeIcon icon={faPerson} style={{ fontSize: 20 }} />
          </div>
          <FontAwesomeIcon icon={faLeftRight} />
          <div>
            <FontAwesomeIcon icon={faPerson} style={{ fontSize: 20 }} />
            <FontAwesomeIcon icon={faPerson} style={{ fontSize: 20 }} />
          </div>
        </S.Icons>
      );
    }
  };

  const getRoute = () => {
    if (activeSeason.type === SeasonType.FACEIT) {
      return Routes.RANKED_SEASON_DETAIL.replace(':seasonId', activeSeason.id);
    } else if (activeSeason.type === SeasonType.SEASON) {
      return Routes.SEASON_DETAIL.replace(':seasonId', activeSeason.id);
    } else if (activeSeason.type === SeasonType.TOURNAMENT) {
      return Routes.CHAMPIONSHIP_DETAIL.replace(':id', activeSeason.id);
    }

    return '';
  };

  return (
    <Link to={getRoute()} style={{ textDecoration: 'none', maxWidth: 250, width: '100%' }}>
      <S.Container>
        {getIcon()}
        <S.TypeTitle>{mapLeagueTypeToTranslation(leagueDetail.type)}</S.TypeTitle>
        <Gap defaultHeight={8} />
        <b>{leagueDetail.name}</b>
        {activeSeason.name}
        <Gap defaultHeight={16} />
      </S.Container>
    </Link>
  );
};
