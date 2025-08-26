import React from 'react';

import { FacebookFilled } from '@ant-design/icons';
import { Spin } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useUserMe } from '../../../api/hooks/auth/api';
import { useLeagueList, useLeaguesWithSeasonsList } from '../../../api/hooks/league/api';
import { Articles } from '../../../components/Articles/Articles';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { H1 } from '../../../components/Titles/H1/H1';
import { Role, SeasonType } from '../../../constants/enums';
import { EXTERNAL_LINKS } from '../../../constants/externalLinks';

import { LeaguePreview } from './components/LeaguePreview/LeaguePreview';
import { messages } from './messages';

import * as S from './Overview.style';

const SPRING_FB_LINK = 'https://www.facebook.com/events/645052631336457/';

export const ChampionshipOverview: React.FC = () => {
  const leagues = useLeagueList();
  const userMe = useUserMe('always', [401]);

  const leaguesWithSeasons = useLeaguesWithSeasonsList([SeasonType.TOURNAMENT, SeasonType.TOURNAMENT_DE]);
  const userIsAdmin = !!userMe.data?.roles.includes(Role.ADMIN);

  return (
    <ContentLayout breadcrumbItems={[{ key: 'bc-championship', title: <FormattedMessage {...messages.title} /> }]}>
      <S.Container>
        <H1>
          <FormattedMessage {...messages.title} />
        </H1>
        <S.Content>
          <FormattedMessage {...messages.description} />
          <Gap defaultHeight={32} />
          <S.Dates onClick={() => window.open(SPRING_FB_LINK, '_blank')} style={{ cursor: 'pointer' }}>
            <S.DateBox>
              <b>
                <FormattedMessage {...messages.spring} />
              </b>
              <span>25.&ndash;27. 4. 2025</span>
            </S.DateBox>
            <S.DateBox>
              <b>
                <FormattedMessage {...messages.autumn} />
              </b>
              <span>26.&ndash;28. 9. 2025</span>
            </S.DateBox>
          </S.Dates>
          <Gap defaultHeight={32} />

          <S.FacebookLink>
            <FormattedMessage {...messages.moreInfo} />
            <a href={EXTERNAL_LINKS.MCRVC_FACEBOOK} target={'_blank'}>
              <FacebookFilled />
            </a>
          </S.FacebookLink>
        </S.Content>
      </S.Container>
      {leagues.isLoading && (
        <>
          <Gap defaultHeight={36} />
          <Spin size="large" />
        </>
      )}
      {leaguesWithSeasons.data?.map((item, index) => {
        const isLast = index === leaguesWithSeasons.data?.length - 1;
        return (
          <>
            <LeaguePreview leagueDetail={item.league} seasons={item.seasons} userIsAdmin={userIsAdmin} />
            {!isLast && <Gap defaultHeight={32} />}
          </>
        );
      })}
      <Gap defaultHeight={32} />
      <Articles categoryId="02c0ca14-15c4-44ec-ad59-1cf474c7916b" newestArticleAlone={false} />
      <Gap defaultHeight={32} />
    </ContentLayout>
  );
};
