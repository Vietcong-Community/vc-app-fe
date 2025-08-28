import React from 'react';

import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons/faPeopleGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Flex } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { useSeasonLadder } from '../../../../../api/hooks/league/api';
import { ISeason } from '../../../../../api/hooks/league/interfaces';
import { AnimatedHeightContainer } from '../../../../../components/Animations/AnimatedHeightContainer/AnimatedHeightContainer';
import { Button } from '../../../../../components/Button/Button';
import { Card } from '../../../../../components/Card/Card';
import { Divider } from '../../../../../components/Divider/Divider';
import { DEFAULT_USER_DATE_FORMAT } from '../../../../../components/Fields/DatePickerField/DatePickerField';
import { Gap } from '../../../../../components/Gap/Gap';
import { H2 } from '../../../../../components/Titles/H2/H2';
import { useRouter } from '../../../../../hooks/RouterHook';
import { useWindowDimensions } from '../../../../../hooks/WindowDimensionsHook';
import { Routes } from '../../../../../routes/enums';
import { formatDateForUser } from '../../../../../utils/dateUtils';
import { mapSeasonTypeToTranslation } from '../../../../../utils/mappingLabelUtils';

import { messages } from './messages';

import * as S from './ChampionshipPreview.style';

interface IProps {
  seasonDetail: ISeason;
}

export const ChampionshipPreview: React.FC<IProps> = (props: IProps) => {
  const { seasonDetail } = props;
  const { navigate } = useRouter();
  const { width } = useWindowDimensions();
  const isSmallerThanMd = width < 768;
  const [isParticipantsExpanded, setIsParticipantsExpanded] = React.useState<boolean>(!isSmallerThanMd);

  const ladder = useSeasonLadder(seasonDetail.id);

  return (
    <Card>
      <Flex justify="space-between">
        <H2>{seasonDetail.name}</H2>
        <Link to={Routes.CHAMPIONSHIP_DETAIL.replace(':id', seasonDetail.id)}>
          <Button>
            <FormattedMessage {...messages.goToDetail} />
          </Button>
        </Link>
      </Flex>
      <Gap defaultHeight={0} height={{ md: 16 }} />
      <Card style={{ flex: 0.5 }} bodyStyle={{ padding: '8px 24px' }}>
        <S.SeasonInfoContainer>
          <div>
            <S.InformationLabel>
              <FormattedMessage {...messages.seasonType} />
            </S.InformationLabel>
            <br />
            <S.InformationValue>{mapSeasonTypeToTranslation(seasonDetail.type)}</S.InformationValue>
          </div>
          <div>
            <S.InformationLabel>
              <FormattedMessage {...messages.seasonDate} />
            </S.InformationLabel>
            <br />
            <S.InformationValue>
              {seasonDetail.startDate && seasonDetail.endDate ? (
                <>
                  {formatDateForUser(seasonDetail.startDate, DEFAULT_USER_DATE_FORMAT)} -{' '}
                  {formatDateForUser(seasonDetail.endDate, DEFAULT_USER_DATE_FORMAT)}
                </>
              ) : (
                <FormattedMessage {...messages.dateNotSpecified} />
              )}
            </S.InformationValue>
          </div>
        </S.SeasonInfoContainer>
      </Card>
      <Divider style={{ margin: '16px 0' }} />
      <Flex vertical align="flex-start">
        <S.ParticipantsTitle>
          <div onClick={() => setIsParticipantsExpanded((val) => !val)}>
            <FormattedMessage {...messages.participants} />
          </div>
          <div
            onClick={() => setIsParticipantsExpanded((val) => !val)}
            style={{ alignItems: 'center', display: 'flex', fontSize: 14, gap: 8, justifyContent: 'center' }}
          >
            {isParticipantsExpanded ? (
              <>
                <FormattedMessage {...messages.close} />
                <S.Icon>
                  <UpOutlined />
                </S.Icon>
              </>
            ) : (
              <>
                <FormattedMessage {...messages.open} />
                <S.Icon>
                  <DownOutlined />
                </S.Icon>
              </>
            )}
          </div>
        </S.ParticipantsTitle>
        <AnimatedHeightContainer isOpen={isParticipantsExpanded}>
          <Gap defaultHeight={16} />
          <S.Participants>
            {ladder.data?.items?.map((item) => {
              const getUserIcon = () => {
                if (item.team?.image?.url) {
                  return <img alt="" src={item.team?.image?.url} style={{ borderRadius: 4, objectFit: 'contain' }} />;
                }

                return <FontAwesomeIcon icon={faPeopleGroup} />;
              };

              return (
                <S.Participant
                  key={`participant-${item.id}`}
                  onClick={() => navigate(Routes.TEAM_DETAIL.replace(':id', item.team.id))}
                >
                  <Avatar shape="square" size={isSmallerThanMd ? 42 : 64} icon={getUserIcon()} style={{ padding: 4 }} />
                  <div style={{ fontWeight: 500 }}>{item.team.name}</div>
                </S.Participant>
              );
            })}
          </S.Participants>
        </AnimatedHeightContainer>
      </Flex>
    </Card>
  );
};
