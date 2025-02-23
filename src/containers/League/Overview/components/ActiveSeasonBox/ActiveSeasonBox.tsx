import React from 'react';

import { faLeftRight } from '@fortawesome/free-solid-svg-icons/faLeftRight';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons/faPeopleGroup';
import { faPerson } from '@fortawesome/free-solid-svg-icons/faPerson';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSeasonsInLeague } from '../../../../../api/hooks/league/api';
import { ILeagueDetail } from '../../../../../api/hooks/league/interfaces';
import { Gap } from '../../../../../components/Gap/Gap';
import { LeagueType, SeasonStatus } from '../../../../../constants/enums';
import { useRouter } from '../../../../../hooks/RouterHook';
import { Routes } from '../../../../../routes/enums';
import { mapLeagueTypeToTranslation } from '../../../../../utils/mappingLabelUtils';

import * as S from './ActiveSeasonBox.style';

interface IProps {
  leagueDetail: ILeagueDetail;
}

export const ActiveSeasonBox: React.FC<IProps> = (props: IProps) => {
  const { leagueDetail } = props;
  const { navigate } = useRouter();
  const seasons = useSeasonsInLeague(leagueDetail.id);

  const activeSeason = seasons.data?.items?.find(
    (item) => item.status === SeasonStatus.ACTIVE || item.status === SeasonStatus.NEW,
  );

  if (!activeSeason) {
    return null;
  }

  const getIcon = () => {
    if (leagueDetail.type === LeagueType.TEAMPLAY) {
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

  return (
    <S.Container onClick={() => navigate(Routes.SEASON_DETAIL.replace(':seasonId', activeSeason.id))}>
      {getIcon()}
      <S.TypeTitle>{mapLeagueTypeToTranslation(leagueDetail.type)}</S.TypeTitle>
      <Gap defaultHeight={8} />
      <b>{leagueDetail.name}</b>
      {activeSeason.name}
      <Gap defaultHeight={16} />
    </S.Container>
  );
};
