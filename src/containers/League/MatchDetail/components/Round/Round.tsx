import React, { useEffect, useState } from 'react';

import { faCross } from '@fortawesome/free-solid-svg-icons/faCross';
import { faFlag } from '@fortawesome/free-solid-svg-icons/faFlag';
import { faSkull } from '@fortawesome/free-solid-svg-icons/faSkull';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQueryClient } from '@tanstack/react-query';
import { Image, Spin, UploadFile } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useConfirmImageUploadUrl } from '../../../../../api/hooks/files/api';
import { useRemoveRoundScreenshot, useRoundResultImageUploadUrl } from '../../../../../api/hooks/league/api';
import { IMatchPlayer, IMatchRound } from '../../../../../api/hooks/league/interfaces';
import usaFlag from '../../../../../assets/usa.png';
import vietnamFlag from '../../../../../assets/vietnam.png';
import { UploadField } from '../../../../../components/Fields/UploadField/UploadField';
import { Gap } from '../../../../../components/Gap/Gap';
import { LinkButton } from '../../../../../components/LinkButton/LinkButton';
import { Nation } from '../../../../../constants/enums';
import { useNotifications } from '../../../../../hooks/NotificationsHook';
import { NotificationType } from '../../../../../providers/NotificationsProvider/enums';
import { theme } from '../../../../../theme/theme';
import { uploadFileWithPresignedUrl } from '../../../../../utils/fileUtils';

import { messages } from './messages';

import * as S from './Round.style';

interface IProps {
  allowUpload: boolean;
  challengerMatchPlayers: IMatchPlayer[];
  challengerTag?: string;
  matchId: string;
  opponentTag?: string;
  opponentMatchPlayers: IMatchPlayer[];
  round: IMatchRound;
  showStatistics: boolean;
}

export const Round: React.FC<IProps> = (props: IProps) => {
  const {
    allowUpload,
    challengerMatchPlayers,
    challengerTag,
    matchId,
    opponentMatchPlayers,
    opponentTag,
    round,
    showStatistics,
  } = props;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
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

  const getWinnerMessage = () => {
    if (round.scoreChallenger > round.scoreOpponent) {
      return challengerTag;
    } else if (round.scoreChallenger < round.scoreOpponent) {
      return opponentTag;
    }

    return <FormattedMessage {...messages.draw} />;
  };

  const getFlag = (nation: Nation) => {
    if (nation === Nation.US) {
      return usaFlag;
    }

    return vietnamFlag;
  };

  const isDraw = round.scoreChallenger === round.scoreOpponent;

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

  return (
    <S.RoundContainer>
      <S.WinnerTag $isDraw={isDraw}>{getWinnerMessage()}</S.WinnerTag>
      <S.MapTitle>{round.map.name}</S.MapTitle>
      <Gap defaultHeight={12} />
      <S.ResultContainer>
        <S.Flag src={getFlag(round.challengerNation)} alt="" />
        <S.TeamTag>{challengerTag}</S.TeamTag>
        {round.scoreChallenger} - {round.scoreOpponent}
        <S.TeamTag>{opponentTag}</S.TeamTag>
        <S.Flag src={getFlag(round.opponentNation)} alt="" />
      </S.ResultContainer>
      {showStatistics && (
        <>
          <Gap defaultHeight={16} />
          <FormattedMessage {...messages.statistics} />
          <Gap defaultHeight={8} />
          <S.Players>
            <S.TeamTag>{challengerTag}</S.TeamTag>
            {challengerRoundStatistics?.map((item) => {
              return (
                <S.StatisticItem>
                  <b>{item.nickname}</b>
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
                  <b>{item.nickname}</b>
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
          {allowUpload && (
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
    </S.RoundContainer>
  );
};
