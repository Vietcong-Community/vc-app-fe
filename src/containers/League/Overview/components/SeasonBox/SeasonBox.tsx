import React from 'react';

import { faLeftRight } from '@fortawesome/free-solid-svg-icons/faLeftRight';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons/faPeopleGroup';
import { faPerson } from '@fortawesome/free-solid-svg-icons/faPerson';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import { ILeagueDetail, ISeason } from '../../../../../api/hooks/league/interfaces';
import { Gap } from '../../../../../components/Gap/Gap';
import { LeagueType, SeasonType } from '../../../../../constants/enums';
import { useWindowDimensions } from '../../../../../hooks/WindowDimensionsHook';
import { Routes } from '../../../../../routes/enums';
import { BreakPoints } from '../../../../../theme/theme';
import { mapLeagueTypeToTranslation } from '../../../../../utils/mappingLabelUtils';

import * as S from './SeasonBox.style';

interface IProps {
  league: ILeagueDetail;
  season: ISeason;
}

export const SeasonBox: React.FC<IProps> = (props: IProps) => {
  const { league, season } = props;

  const { width } = useWindowDimensions();
  const isSmallerThanMD = width < BreakPoints.md;

  const getIcon = () => {
    if (league.type === LeagueType.TEAMPLAY || league.type === LeagueType.FACEIT) {
      return (
        <S.Icons>
          <FontAwesomeIcon icon={faPeopleGroup} style={{ fontSize: 20 }} />
          <FontAwesomeIcon icon={faLeftRight} />
          <FontAwesomeIcon icon={faPeopleGroup} style={{ fontSize: 20 }} />
        </S.Icons>
      );
    }

    if (league.type === LeagueType.TWOVSTWO) {
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
    if (season.type === SeasonType.FACEIT) {
      return Routes.RANKED_SEASON_DETAIL.replace(':seasonId', season.id);
    } else if (season.type === SeasonType.SEASON) {
      return Routes.SEASON_DETAIL.replace(':seasonId', season.id);
    } else if (season.type === SeasonType.TOURNAMENT) {
      return Routes.CHAMPIONSHIP_DETAIL.replace(':id', season.id);
    }

    return '';
  };

  return (
    <Link
      to={getRoute()}
      style={{ textDecoration: 'none', maxWidth: isSmallerThanMD ? 'initial' : 250, width: '100%' }}
    >
      <S.Container>
        {getIcon()}
        <S.TypeTitle>{mapLeagueTypeToTranslation(league.type)}</S.TypeTitle>
        <Gap defaultHeight={8} />
        <b>{league.name}</b>
        {season.name}
        <Gap defaultHeight={16} />
      </S.Container>
    </Link>
  );
};
