import React, { useState } from 'react';

import { DownOutlined, UpOutlined, UserOutlined } from '@ant-design/icons';
import { faCrown } from '@fortawesome/free-solid-svg-icons/faCrown';
import { faFlag } from '@fortawesome/free-solid-svg-icons/faFlag';
import { faGhost } from '@fortawesome/free-solid-svg-icons/faGhost';
import { faSkull } from '@fortawesome/free-solid-svg-icons/faSkull';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, DatePicker, DatePickerProps, Flex, Spin } from 'antd';
import dayjs from 'dayjs';
import { FormattedMessage } from 'react-intl';

import { useTopPlayersOfTheDay } from '../../../../../api/hooks/league/api';
import { AnimatedHeightContainer } from '../../../../../components/Animations/AnimatedHeightContainer/AnimatedHeightContainer';
import { EaseInOutContainer } from '../../../../../components/Animations/EaseInOutContainer/EaseInOutContainer';
import { Card } from '../../../../../components/Card/Card';
import {
  DEFAULT_SYSTEM_DATE_FORMAT,
  DEFAULT_USER_DATE_FORMAT,
} from '../../../../../components/Fields/DatePickerField/DatePickerField';
import { Gap } from '../../../../../components/Gap/Gap';
import { useRouter } from '../../../../../hooks/RouterHook';
import { useWindowDimensions } from '../../../../../hooks/WindowDimensionsHook';
import { Routes } from '../../../../../routes/enums';
import { BreakPoints } from '../../../../../theme/theme';

import { messages } from './messages';

import * as S from './TopPlayersOfTheDay.style';

interface IProps {
  seasonId: string;
}

export const TopPlayersOfTheDay: React.FC<IProps> = (props: IProps) => {
  const { seasonId } = props;
  const { navigate } = useRouter();
  const { width } = useWindowDimensions();
  const [isOpen, setIsOpen] = useState<boolean>(width >= BreakPoints.md);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const playersOfTheDay = useTopPlayersOfTheDay(seasonId, selectedDate.format(DEFAULT_SYSTEM_DATE_FORMAT));

  const goToPlayerDetail = (id?: string) => {
    if (id) {
      navigate(Routes.USER_PROFILE.replace(':id', id));
    }
  };

  const onChange: DatePickerProps['onChange'] = (date) => {
    setSelectedDate(date);
  };

  return (
    <Card>
      <Flex justify="space-between">
        <S.CardTitle>
          <FormattedMessage {...messages.title} />
        </S.CardTitle>
        <div
          onClick={() => setIsOpen((val) => !val)}
          style={{
            alignItems: 'center',
            cursor: 'pointer',
            display: 'flex',
            fontSize: 14,
            gap: 8,
            justifyContent: 'center',
          }}
        >
          {isOpen ? (
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
      </Flex>
      <Gap defaultHeight={8} />
      <AnimatedHeightContainer isOpen={isOpen}>
        <Flex justify="flex-start">
          <DatePicker
            allowClear={false}
            defaultValue={selectedDate}
            format={DEFAULT_USER_DATE_FORMAT}
            onChange={onChange}
            minDate={dayjs('2025-01-01', DEFAULT_SYSTEM_DATE_FORMAT)}
            maxDate={dayjs()}
          />
        </Flex>
        <Gap defaultHeight={16} />
        {playersOfTheDay.isLoading && (
          <>
            <Spin size="large" spinning />
          </>
        )}
        <EaseInOutContainer isOpen={!playersOfTheDay.isLoading}>
          <S.Content>
            <S.HighlightItem>
              <S.Count>{playersOfTheDay.data?.flags?.flags ?? 0}</S.Count>
              <S.ItemName>
                <FontAwesomeIcon icon={faFlag} style={{ fontSize: 20 }} />
                <FormattedMessage {...messages.flagger} />
              </S.ItemName>
              <S.ItemDescription>
                <FormattedMessage {...messages.flaggerDescription} />
              </S.ItemDescription>
              <Gap defaultHeight={16} />
              {!playersOfTheDay.data?.flags && (
                <FormattedMessage
                  {...messages.nothingToShow}
                  values={{ value: selectedDate.format(DEFAULT_USER_DATE_FORMAT) }}
                />
              )}
              {playersOfTheDay.data?.flags && (
                <S.Player onClick={() => goToPlayerDetail(playersOfTheDay.data?.flags?.player?.id)}>
                  <Avatar
                    size={32}
                    icon={
                      playersOfTheDay.data?.flags?.player?.image?.url ? (
                        <img alt="" src={playersOfTheDay.data?.flags?.player?.image?.url} />
                      ) : (
                        <UserOutlined />
                      )
                    }
                  />
                  <b>{playersOfTheDay.data?.flags?.player?.nickname ?? ''}</b>
                </S.Player>
              )}
            </S.HighlightItem>
            <S.HighlightItem>
              <S.Count>{playersOfTheDay.data?.kills?.kills ?? 0}</S.Count>
              <S.ItemName>
                <FontAwesomeIcon icon={faSkull} style={{ fontSize: 20 }} />
                <FormattedMessage {...messages.killer} />
              </S.ItemName>
              <S.ItemDescription>
                <FormattedMessage {...messages.killerDescription} />
              </S.ItemDescription>
              <Gap defaultHeight={16} />
              {!playersOfTheDay.data?.kills && (
                <FormattedMessage
                  {...messages.nothingToShow}
                  values={{ value: selectedDate.format(DEFAULT_USER_DATE_FORMAT) }}
                />
              )}
              {playersOfTheDay.data?.kills && (
                <S.Player onClick={() => goToPlayerDetail(playersOfTheDay.data?.kills?.player?.id)}>
                  <Avatar
                    size={32}
                    icon={
                      playersOfTheDay.data?.kills?.player?.image?.url ? (
                        <img alt="" src={playersOfTheDay.data?.kills?.player?.image?.url} />
                      ) : (
                        <UserOutlined />
                      )
                    }
                  />
                  <b>{playersOfTheDay.data?.kills?.player?.nickname ?? ''}</b>
                </S.Player>
              )}
            </S.HighlightItem>
            <S.HighlightItem>
              <S.Count>{playersOfTheDay.data?.deaths?.deaths ?? 0}</S.Count>
              <S.ItemName>
                <FontAwesomeIcon icon={faGhost} style={{ fontSize: 20 }} />
                <FormattedMessage {...messages.deaths} />
              </S.ItemName>
              <S.ItemDescription>
                <FormattedMessage {...messages.deathsDescription} />
              </S.ItemDescription>
              <Gap defaultHeight={16} />
              {!playersOfTheDay.data?.deaths && (
                <FormattedMessage
                  {...messages.nothingToShow}
                  values={{ value: selectedDate.format(DEFAULT_USER_DATE_FORMAT) }}
                />
              )}
              {playersOfTheDay.data?.deaths && (
                <S.Player onClick={() => goToPlayerDetail(playersOfTheDay.data?.deaths?.player?.id)}>
                  <Avatar
                    size={32}
                    icon={
                      playersOfTheDay.data?.deaths?.player?.image?.url ? (
                        <img alt="" src={playersOfTheDay.data?.deaths?.player?.image?.url} />
                      ) : (
                        <UserOutlined />
                      )
                    }
                  />
                  <b>{playersOfTheDay.data?.deaths?.player?.nickname ?? ''}</b>
                </S.Player>
              )}
            </S.HighlightItem>
            <S.HighlightItem>
              <S.Count>{playersOfTheDay.data?.kd?.kd ?? 0}</S.Count>
              <S.ItemName>
                <FontAwesomeIcon icon={faCrown} style={{ fontSize: 20 }} />
                <FormattedMessage {...messages.killDeathRation} />
              </S.ItemName>
              <S.ItemDescription>
                <FormattedMessage {...messages.killDeathRatioDescription} />
              </S.ItemDescription>
              <Gap defaultHeight={16} />
              {!playersOfTheDay.data?.kd && (
                <FormattedMessage
                  {...messages.nothingToShow}
                  values={{ value: selectedDate.format(DEFAULT_USER_DATE_FORMAT) }}
                />
              )}
              {playersOfTheDay.data?.kd && (
                <S.Player onClick={() => goToPlayerDetail(playersOfTheDay.data?.kd?.player?.id)}>
                  <Avatar
                    size={32}
                    icon={
                      playersOfTheDay.data?.kd?.player?.image?.url ? (
                        <img alt="" src={playersOfTheDay.data?.kd?.player?.image?.url} />
                      ) : (
                        <UserOutlined />
                      )
                    }
                  />
                  <b>{playersOfTheDay.data?.kd?.player?.nickname ?? ''}</b>
                </S.Player>
              )}
            </S.HighlightItem>
          </S.Content>
        </EaseInOutContainer>
      </AnimatedHeightContainer>
    </Card>
  );
};
