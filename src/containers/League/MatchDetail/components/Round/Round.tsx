import React, { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Image, UploadFile } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useConfirmImageUploadUrl } from '../../../../../api/hooks/files/api';
import { useRoundResultImageUploadUrl } from '../../../../../api/hooks/league/api';
import { IMatchRound } from '../../../../../api/hooks/league/interfaces';
import usaFlag from '../../../../../assets/usa.png';
import vietnamFlag from '../../../../../assets/vietnam.png';
import { UploadField } from '../../../../../components/Fields/UploadField/UploadField';
import { Gap } from '../../../../../components/Gap/Gap';
import { useNotifications } from '../../../../../hooks/NotificationsHook';
import { NotificationType } from '../../../../../providers/NotificationsProvider/enums';
import { uploadFileWithPresignedUrl } from '../../../../../utils/fileUtils';

import { messages } from './messages';

import * as S from './Round.style';

interface IProps {
  allowUpload: boolean;
  challengerTag?: string;
  matchId: string;
  opponentTag?: string;
  round: IMatchRound;
}

export const Round: React.FC<IProps> = (props: IProps) => {
  const { allowUpload, challengerTag, matchId, opponentTag, round } = props;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const queryClient = useQueryClient();
  const { showNotification } = useNotifications();

  const confirmUpload = useConfirmImageUploadUrl();
  const screenshotUpload = useRoundResultImageUploadUrl(matchId, round.id);

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

  const isDraw = round.scoreChallenger === round.scoreOpponent;

  return (
    <S.RoundContainer>
      <S.WinnerTag $isDraw={isDraw}>{getWinnerMessage()}</S.WinnerTag>
      <S.MapTitle>{round.map.name}</S.MapTitle>
      <Gap defaultHeight={12} />
      <S.ResultContainer>
        <S.Flag src={usaFlag} alt="" />
        <S.TeamTag>{challengerTag}</S.TeamTag>
        {round.scoreChallenger} - {round.scoreOpponent}
        <S.TeamTag>{opponentTag}</S.TeamTag>
        <S.Flag src={vietnamFlag} alt="" />
      </S.ResultContainer>
      {round.screenshot?.url && (
        <>
          <Gap defaultHeight={16} />
          <FormattedMessage {...messages.screenshot} />
          <Gap defaultHeight={8} />
          <Image
            width="100%"
            src={
              'https://vietcong-hub.fra1.digitaloceanspaces.com/team/avatars/7ef5ae8f-c200-4574-9a4e-5d0d9e796ecf/472965033_583992801175215_5739325119773577940_n.jpg'
            }
          />
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
