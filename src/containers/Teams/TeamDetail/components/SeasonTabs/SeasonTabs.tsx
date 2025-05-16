import React from 'react';

import { Spin, Tabs } from 'antd';
import { useIntl } from 'react-intl';

import { useTeamSeasons } from '../../../../../api/hooks/teams/api';
import { EaseInOutContainer } from '../../../../../components/Animations/EaseInOutContainer/EaseInOutContainer';
import { Divider } from '../../../../../components/Divider/Divider';
import { Gap } from '../../../../../components/Gap/Gap';
import { SeasonType } from '../../../../../constants/enums';
import { SeasonOverview } from '../SeasonOverview/SeasonOverview';

import { messages } from './messages';

interface IProps {
  teamId: string;
}

export const SeasonTabs: React.FC<IProps> = (props: IProps) => {
  const { teamId } = props;
  const { formatMessage } = useIntl();

  const seasons = useTeamSeasons(teamId);

  const items = seasons.data?.items?.map((season) => {
    const type =
      season.type === SeasonType.SEASON ? formatMessage(messages.league) : formatMessage(messages.tournament);

    return {
      label: `${type} - ${season.name}`,
      key: season.id,
      children: <SeasonOverview teamId={teamId} season={season} />,
    };
  });

  return (
    <>
      {seasons.isLoading && <Spin size="large" />}
      <EaseInOutContainer isOpen={!seasons.isLoading && (seasons.data?.items?.length ?? 0) > 0}>
        <Divider />
        <Gap defaultHeight={16} />
        <Tabs type="card" defaultActiveKey="1" items={items} style={{ width: '100%' }} />
      </EaseInOutContainer>
    </>
  );
};
