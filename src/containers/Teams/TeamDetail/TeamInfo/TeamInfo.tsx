import React from 'react';

import teamImg from 'src/assets/heli-footer1.webp';

import { useTeamDetail } from '../../../../api/hooks/teams/api';
import { Gap } from '../../../../components/Gap/Gap';
import { ContentLayout } from '../../../../components/Layouts/ContentLayout/ContentLayout';
import { useRouter } from '../../../../hooks/RouterHook';

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
              <i>Testing tym</i>
              <Gap defaultHeight={32} height={{ md: 32, sm: 16 }} />
            </S.InfoCard>
            <S.InfoCard>
              <b>Clantag:</b>
              <i>-=!TT!=-</i>
              <Gap defaultHeight={32} height={{ md: 32, sm: 16 }} />
            </S.InfoCard>
            <S.InfoCard>
              <b>Členem od:</b>
              <i>31.07.24</i>
              <Gap defaultHeight={32} height={{ md: 32, sm: 16 }} />
            </S.InfoCard>
            <S.InfoCard>
              {team.data?.description}
              <Gap defaultHeight={32} height={{ md: 32, sm: 16 }} />
            </S.InfoCard>
          </S.InfoDiv>
        </S.Content>
      </ContentLayout>
    </>
  );
};
