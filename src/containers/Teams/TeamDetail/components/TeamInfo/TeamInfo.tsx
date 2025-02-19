import React, { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Spin, UploadFile } from 'antd';
import { isEmpty } from 'lodash';
import { FormattedMessage } from 'react-intl';
import teamImg from 'src/assets/heli-footer-light-design.webp';

import { useConfirmImageUploadUrl } from '../../../../../api/hooks/files/api';
import { useTeamAvatarUploadUrl, useTeamSeasons } from '../../../../../api/hooks/teams/api';
import { ITeam } from '../../../../../api/hooks/teams/interfaces';
import { EaseInOutContainer } from '../../../../../components/Animations/EaseInOutContainer/EaseInOutContainer';
import { Button } from '../../../../../components/Button/Button';
import { Divider } from '../../../../../components/Divider/Divider';
import { UploadField } from '../../../../../components/Fields/UploadField/UploadField';
import { Gap } from '../../../../../components/Gap/Gap';
import { H2 } from '../../../../../components/Titles/H2/H2';
import { useNotifications } from '../../../../../hooks/NotificationsHook';
import { useRouter } from '../../../../../hooks/RouterHook';
import { NotificationType } from '../../../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../../../routes/enums';
import { formatDateForUser } from '../../../../../utils/dateUtils';
import { uploadFileWithPresignedUrl } from '../../../../../utils/fileUtils';
import { Matches } from '../Matches/Matches';

import { messages } from './messages';

import * as S from './TeamInfo.style';

interface IProps {
  teamDetail?: ITeam;
  showAvatarUploadOption?: boolean;
}

export const TeamInfo: React.FC<IProps> = (props: IProps) => {
  const { teamDetail, showAvatarUploadOption = false } = props;
  const queryClient = useQueryClient();
  const { showNotification } = useNotifications();
  const { navigate } = useRouter();

  const [showAvatarUpload, setShowAvatarUpload] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const seasons = useTeamSeasons(teamDetail?.id ?? '');
  const logoUrl = useTeamAvatarUploadUrl(teamDetail?.id ?? '');
  const confirmUpload = useConfirmImageUploadUrl();

  const uploadAvatar = async () => {
    try {
      if (fileList.length > 0) {
        const avatarName = fileList?.[0]?.name;
        if (avatarName) {
          const response = await logoUrl.mutateAsync({ fileName: avatarName });

          await uploadFileWithPresignedUrl(fileList?.[0], response.uploadUrl);

          await confirmUpload.mutateAsync({ fileId: response.fileId });
        }
        setFileList([]);
        await queryClient.refetchQueries({ queryKey: ['team', teamDetail?.id] });
        showNotification(messages.avatarUploadSuccess);
      }
    } catch {
      showNotification(messages.avatarUploadFailed, undefined, NotificationType.ERROR);
    }
  };

  useEffect(() => {
    if (fileList.length === 1) {
      uploadAvatar();
    }
  }, [fileList.length]);

  const usePlaceholderLogo = !teamDetail?.image?.url;

  return (
    <>
      <S.Content>
        <S.PictureDiv>
          {usePlaceholderLogo && !showAvatarUpload && <S.TeamImage src={teamImg} />}
          {!usePlaceholderLogo && !showAvatarUpload && <S.TeamImage src={teamDetail?.image?.url} alt="" />}
          {showAvatarUpload && <UploadField fileList={fileList} setFileList={setFileList} />}
          {showAvatarUploadOption && (
            <Button onClick={() => setShowAvatarUpload(true)}>
              <FormattedMessage {...messages.uploadAvatar} />
            </Button>
          )}
        </S.PictureDiv>
        <S.InfoDiv>
          <S.InfoCard>
            <b>
              <FormattedMessage {...messages.teamName} />
            </b>
            <i>{teamDetail?.name}</i>
            <Gap defaultHeight={32} height={{ md: 32, sm: 16 }} />
          </S.InfoCard>
          <S.InfoCard>
            <b>
              <FormattedMessage {...messages.clanTag} />
            </b>
            <i>{teamDetail?.tag}</i>
            <Gap defaultHeight={32} height={{ md: 32, sm: 16 }} />
          </S.InfoCard>
          <S.InfoCard>
            <b>
              <FormattedMessage {...messages.memberFrom} />
            </b>
            <i>{formatDateForUser(teamDetail?.createdAt)}</i>
            <Gap defaultHeight={32} height={{ md: 32, sm: 16 }} />
          </S.InfoCard>
          <S.InfoCard>
            {isEmpty(teamDetail?.description) ? (
              <i>
                <FormattedMessage {...messages.fakeDescription} />
              </i>
            ) : (
              teamDetail?.description
            )}
            <Gap defaultHeight={32} height={{ md: 32, sm: 16 }} />
          </S.InfoCard>
        </S.InfoDiv>
      </S.Content>
      <Gap defaultHeight={32} height={{ md: 16 }} />
      <Divider />
      {seasons.isLoading && <Spin size="large" />}
      <EaseInOutContainer isOpen={!seasons.isLoading && (seasons.data?.items?.length ?? 0) > 0 && !!teamDetail?.id}>
        <H2 style={{ textAlign: 'start' }}>
          <FormattedMessage {...messages.seasonsMatches} />
        </H2>
        <Gap defaultHeight={16} />
        {seasons.data?.items.map((season, index) => {
          const isLast = index === seasons.data?.items.length - 1;
          return (
            <>
              <S.SeasonTitle onClick={() => navigate(Routes.SEASON_DETAIL.replace(':seasonId', season.id))}>
                {season.name}
              </S.SeasonTitle>
              <Gap defaultHeight={8} />
              <Matches teamId={teamDetail?.id ?? ''} seasonId={season.id} />
              {!isLast && <Gap defaultHeight={16} />}
            </>
          );
        })}
      </EaseInOutContainer>
    </>
  );
};
