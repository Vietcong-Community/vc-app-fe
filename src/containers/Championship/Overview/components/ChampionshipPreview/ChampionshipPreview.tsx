import React from 'react';

import { Flex } from 'antd';
import { FormattedMessage } from 'react-intl';

import { ISeason } from '../../../../../api/hooks/league/interfaces';
import { Button } from '../../../../../components/Button/Button';
import { Gap } from '../../../../../components/Gap/Gap';
import { useRouter } from '../../../../../hooks/RouterHook';
import { Routes } from '../../../../../routes/enums';

import { messages } from './messages';

interface IProps {
  seasonDetail: ISeason;
}

export const ChampionshipPreview: React.FC<IProps> = (props: IProps) => {
  const { seasonDetail } = props;
  const { navigate } = useRouter();

  return (
    <>
      NAHLED TURNAJA
      <br />
      <Gap defaultHeight={16} />
      <Flex justify="flex-end">
        <Button onClick={() => navigate(Routes.CHAMPIONSHIP_DETAIL.replace(':id', seasonDetail.id))}>
          <FormattedMessage {...messages.goToDetail} />
        </Button>
      </Flex>
      <Gap defaultHeight={32} />
    </>
  );
};
