import React from 'react';

import { faTrophy } from '@fortawesome/free-solid-svg-icons/faTrophy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from 'antd';
import { isEmpty } from 'lodash';
import isNil from 'lodash/isNil';
import { FormattedMessage } from 'react-intl';

import { IAchievement } from '../../../../api/hooks/achievements/interfaces';
import { Gap } from '../../../../components/Gap/Gap';
import { formatDateForUser } from '../../../../utils/dateUtils';
import makerImg from '../Achievements/web-maker.png';

import { messages } from './messages';

import * as S from './AchievementDetailModal.style';

interface IProps {
  achievement?: IAchievement;
  setAchievement: (achievement: IAchievement | undefined) => void;
}

export const AchievementDetailModal: React.FC<IProps> = (props: IProps) => {
  const { achievement, setAchievement } = props;
  const noIcon = isEmpty(achievement?.type.icon) || isNil(achievement?.type.icon);

  const webMaker = achievement?.type.name === 'Tvůrce VietcongHUBu';

  const noRecordName = isEmpty(achievement?.record.name);

  return (
    <Modal
      cancelButtonProps={{ style: { display: 'none' } }}
      onCancel={() => setAchievement(undefined)}
      onOk={() => setAchievement(undefined)}
      open={!!achievement}
    >
      <S.Content>
        <S.AchievementIconAvatar
          size={128}
          shape="square"
          icon={
            noIcon && !webMaker ? (
              <FontAwesomeIcon icon={faTrophy} style={{ fontSize: 64 }} />
            ) : (
              <>{webMaker ? <img src={makerImg} alt="" /> : <img src={achievement?.type.icon} alt="" />}</>
            )
          }
          style={{ background: 'white' }}
        />
        <Gap defaultHeight={16} />
        <b>{achievement?.record.name ?? ''}</b>
        {noRecordName && <b>{achievement?.type.name}</b>}
        {!noRecordName && (
          <>
            {achievement?.type.name}
            <br />
          </>
        )}
        {achievement?.type?.description}
        <Gap defaultHeight={16} />
        <div style={{ fontSize: 12 }}>
          <FormattedMessage
            {...messages.received}
            values={{ date: formatDateForUser(achievement?.record?.achievedAt) }}
          />
        </div>
      </S.Content>
    </Modal>
  );
};
