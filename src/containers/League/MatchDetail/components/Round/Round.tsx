import React, { useEffect, useState } from 'react';

import { faCross } from '@fortawesome/free-solid-svg-icons/faCross';
import { faFlag } from '@fortawesome/free-solid-svg-icons/faFlag';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { faSkull } from '@fortawesome/free-solid-svg-icons/faSkull';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQueryClient } from '@tanstack/react-query';
import { Dropdown, Image, MenuProps, Spin, UploadFile } from 'antd';
import dayjs from 'dayjs';
import { FormattedMessage } from 'react-intl';

import { useConfirmImageUploadUrl } from '../../../../../api/hooks/files/api';
import { useRemoveRoundScreenshot, useRoundResultImageUploadUrl } from '../../../../../api/hooks/league/api';
import { IMatchPlayer, IMatchRound } from '../../../../../api/hooks/league/interfaces';
import usaFlag from '../../../../../assets/usa.png';
import vietnamFlag from '../../../../../assets/vietnam.png';
import { DEFAULT_USER_DATE_FORMAT_WITH_TIME } from '../../../../../components/Fields/DatePickerField/DatePickerField';
import { UploadField } from '../../../../../components/Fields/UploadField/UploadField';
import { Gap } from '../../../../../components/Gap/Gap';
import { LinkButton } from '../../../../../components/LinkButton/LinkButton';
import { MatchStatus, Nation } from '../../../../../constants/enums';
import { useNotifications } from '../../../../../hooks/NotificationsHook';
import { useRouter } from '../../../../../hooks/RouterHook';
import { NotificationType } from '../../../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../../../routes/enums';
import { theme } from '../../../../../theme/theme';
import { uploadFileWithPresignedUrl } from '../../../../../utils/fileUtils';
import { RemoveRoundModal } from '../RemoveRoundModal/RemoveRoundModal';
import { UpdateRoundModal } from '../UpdateRoundModal/UpdateMatchModal';

import { messages } from './messages';

import * as S from './Round.style';

interface IProps {
  allowUpload: boolean;
  challengerMatchPlayers: IMatchPlayer[];
  challengerTag?: string;
  matchId: string;
  opponentTag?: string;
  opponentMatchPlayers: IMatchPlayer[];
  matchStatus?: MatchStatus;
  round: IMatchRound;
  seasonId?: string;
  showStatistics: boolean;
  userIsAdmin: boolean;
}

export const Round: React.FC<IProps> = (props: IProps) => {
  const {
    allowUpload,
    challengerMatchPlayers,
    challengerTag,
    matchId,
    matchStatus,
    opponentMatchPlayers,
    opponentTag,
    round,
    seasonId,
    showStatistics,
    userIsAdmin,
  } = props;
  const [updateRoundModalIsOpen, setUpdateRoundModalIsOpen] = useState<boolean>(false);
  const [removeRoundModalIsOpen, setRemoveRoundModalIsOpen] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { navigate } = useRouter();
  const queryClient = useQueryClient();
  const { showNotification } = useNotifications();

  const confirmUpload = useConfirmImageUploadUrl();
  const screenshotUpload = useRoundResultImageUploadUrl(matchId, round.id);
  const removeScreenshot = useRemoveRoundScreenshot(round.id);

  const handleDelete = async () => {
    try {
      await removeScreenshot.mutateAsync();
      await queryClient.refetchQueries({ queryKey: ['matchDetail', matchId] });
    } catch {
      showNotification(messages.screenshotUploadFailed, undefined, NotificationType.ERROR);
    }
  };

  const uploadScreenshot = async () => {
    try {
      if (fileList.length > 0) {
        const screenshotName = fileList?.[0]?.name;
        if (screenshotName) {
          const response = await screenshotUpload.mutateAsync({ fileName: screenshotName });

          await uploadFileWithPresignedUrl(fileList?.[0], response.uploadUrl);

          await confirmUpload.mutateAsync({ fileId: response.fileId });
        }
        setFileList([]);
        await queryClient.refetchQueries({ queryKey: ['matchDetail', matchId] });
        showNotification(messages.screenshotUploadSuccess);
      }
    } catch {
      showNotification(messages.screenshotUploadFailed, undefined, NotificationType.ERROR);
    }
  };

  useEffect(() => {
    if (fileList.length === 1) {
      uploadScreenshot();
    }
  }, [fileList.length]);

  const getFlag = (nation: Nation) => {
    if (nation === Nation.US) {
      return usaFlag;
    }

    return vietnamFlag;
  };

  const challengerRoundStatistics = round.playersRoundStats
    ?.filter((item) => !!challengerMatchPlayers.find((challenger) => challenger.id === item.playerInMatchId))
    .map((item) => {
      const player = challengerMatchPlayers.find((challenger) => challenger.id === item.playerInMatchId);

      return { ...item, nickname: player?.user.nickname, playerId: player?.user.id };
    });

  const opponentRoundStatistics = round.playersRoundStats
    ?.filter((item) => !!opponentMatchPlayers.find((challenger) => challenger.id === item.playerInMatchId))
    .map((item) => {
      const player = opponentMatchPlayers.find((challenger) => challenger.id === item.playerInMatchId);

      return { ...item, nickname: player?.user.nickname, playerId: player?.user.id };
    });

  const adminItems: MenuProps['items'] = [
    {
      label: <FormattedMessage {...messages.roundUpdate} />,
      key: '1',
      onClick: () => setUpdateRoundModalIsOpen(true),
    },
    {
      label: <FormattedMessage {...messages.roundDelete} />,
      key: '2',
      onClick: () => setRemoveRoundModalIsOpen(true),
    },
  ];

  const matchIsFinished = matchStatus === MatchStatus.FINISHED;

  return (
    <>
      <S.RoundContainer>
        <div>
          {userIsAdmin && !matchIsFinished && (
            <S.AdminActions>
              <Dropdown menu={{ items: adminItems }} trigger={['click']}>
                <FontAwesomeIcon icon={faGear} style={{ cursor: 'pointer', fontSize: 20 }} />
              </Dropdown>
            </S.AdminActions>
          )}
          <S.MapTitle>{round.map.name}</S.MapTitle>
          <Gap defaultHeight={12} />
          <S.ResultContainer>
            <S.Flag src={getFlag(round.challengerNation)} alt="" />
            <S.TeamTag>{challengerTag}</S.TeamTag>
            {round.scoreChallenger} - {round.scoreOpponent}
            <S.TeamTag>{opponentTag}</S.TeamTag>
            <S.Flag src={getFlag(round.opponentNation)} alt="" />
          </S.ResultContainer>
          {showStatistics && (challengerRoundStatistics.length > 0 || opponentRoundStatistics?.length > 0) && (
            <>
              <Gap defaultHeight={16} />
              <FormattedMessage {...messages.statistics} />
              <Gap defaultHeight={8} />
              <S.Players>
                <S.TeamTag>{challengerTag}</S.TeamTag>
                {challengerRoundStatistics?.map((item) => {
                  return (
                    <S.StatisticItem>
                      <b
                        onClick={() => navigate(Routes.USER_PROFILE.replace(':id', item.playerId ?? ''))}
                        style={{ cursor: 'pointer' }}
                      >
                        {item.nickname}
                      </b>
                      <S.Statistics>
                        <div>
                          <FontAwesomeIcon icon={faFlag} /> {item.flags}
                        </div>
                        <div>
                          <FontAwesomeIcon icon={faSkull} /> {item.kills}
                        </div>
                        <div>
                          <FontAwesomeIcon icon={faCross} /> {item.deaths}
                        </div>
                      </S.Statistics>
                    </S.StatisticItem>
                  );
                })}
              </S.Players>
              <Gap defaultHeight={8} />
              <S.Players>
                <S.TeamTag>{opponentTag}</S.TeamTag>
                {opponentRoundStatistics?.map((item) => {
                  return (
                    <S.StatisticItem>
                      <b
                        onClick={() => navigate(Routes.USER_PROFILE.replace(':id', item.playerId ?? ''))}
                        style={{ cursor: 'pointer' }}
                      >
                        {item.nickname}
                      </b>
                      <S.Statistics>
                        <div>
                          <FontAwesomeIcon icon={faFlag} /> {item.flags}
                        </div>
                        <div>
                          <FontAwesomeIcon icon={faSkull} /> {item.kills}
                        </div>
                        <div>
                          <FontAwesomeIcon icon={faCross} /> {item.deaths}
                        </div>
                      </S.Statistics>
                    </S.StatisticItem>
                  );
                })}
              </S.Players>
            </>
          )}
          {round.screenshot?.url && (
            <>
              <Gap defaultHeight={16} />
              <FormattedMessage {...messages.screenshot} />
              <Gap defaultHeight={8} />
              <Image width="100%" src={round.screenshot?.url} />
              {allowUpload && !matchIsFinished && (
                <>
                  <Gap defaultHeight={8} />
                  {removeScreenshot.isPending && <Spin size="small" />}
                  {!removeScreenshot.isPending && (
                    <div style={{ textAlign: 'end', width: '100%' }}>
                      <LinkButton onClick={handleDelete} style={{ color: theme.colors.red }} withScale={false}>
                        <FormattedMessage {...messages.delete} />
                      </LinkButton>
                    </div>
                  )}
                </>
              )}
            </>
          )}
          {!round.screenshot && allowUpload && (
            <>
              <Gap defaultHeight={16} />
              <FormattedMessage {...messages.screenshot} />
              <Gap defaultHeight={8} />
              <S.UploadBox>
                <UploadField fileList={fileList} setFileList={setFileList} />
              </S.UploadBox>
            </>
          )}
        </div>
        {!!round.createdBy && (
          <>
            <Gap defaultHeight={16} />
            <div style={{ fontSize: 12 }}>
              <FormattedMessage
                {...messages.createdBy}
                values={{
                  nickname: round.createdBy.nickname,
                  date: dayjs(round.createdAt).format(DEFAULT_USER_DATE_FORMAT_WITH_TIME),
                }}
              />
            </div>
          </>
        )}
      </S.RoundContainer>
      <UpdateRoundModal
        isOpen={updateRoundModalIsOpen}
        onClose={() => setUpdateRoundModalIsOpen(false)}
        matchId={matchId}
        seasonId={seasonId}
        initialValues={{
          mapId: round.map.id,
          round: round.round,
          scoreChallenger: round.scoreChallenger,
          scoreOpponent: round.scoreOpponent,
        }}
        roundId={round.id}
      />
      <RemoveRoundModal
        isOpen={removeRoundModalIsOpen}
        onClose={() => setRemoveRoundModalIsOpen(false)}
        matchId={matchId}
        roundId={round.id}
      />
    </>
  );
};
