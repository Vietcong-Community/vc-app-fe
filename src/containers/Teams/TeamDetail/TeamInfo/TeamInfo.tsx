import React from 'react';

import teamImg from 'src/assets/heli-footer1.webp';

import { useTeamDetail } from '../../../../api/hooks/teams/api';
import { Gap } from '../../../../components/Gap/Gap';
import { ContentLayout } from '../../../../components/Layouts/ContentLayout/ContentLayout';
import { useRouter } from '../../../../hooks/RouterHook';
import { formatDateForUser } from '../../../../utils/dateUtils';

import * as S from './TeamInfo.style';

export const TeamInfo: React.FC = () => {
  const { query } = useRouter<{ id: string }>();
  const team = useTeamDetail(query.id);
  return (
    <>
      <ContentLayout>
        <S.Content id={'content'}>
          <S.PictureDiv id={'pictureDiv'}>
            <S.TeamImage src={teamImg} />
          </S.PictureDiv>
          <S.InfoDiv id={'infoDiv'}>
            <S.InfoCard>
              <b>Název týmu:</b>
              <i>{team.data?.name}</i>
              <Gap defaultHeight={32} height={{ md: 32, sm: 16 }} />
            </S.InfoCard>
            <S.InfoCard>
              <b>Clantag:</b>
              <i>{team.data?.tag}</i>
              <Gap defaultHeight={32} height={{ md: 32, sm: 16 }} />
            </S.InfoCard>
            <S.InfoCard>
              <b>Členem od:</b>
              <i>{formatDateForUser(team.data?.createdAt)}</i>
              <Gap defaultHeight={32} height={{ md: 32, sm: 16 }} />
            </S.InfoCard>
            <S.InfoCard>
              <i>Tenhle tym neni vubec kreativni, aby si vytvorili popis toho, jaci jsou. Hanba.</i>
              {team.data?.description}
              <Gap defaultHeight={32} height={{ md: 32, sm: 16 }} />
            </S.InfoCard>
          </S.InfoDiv>
        </S.Content>
      </ContentLayout>
    </>
  );
};
