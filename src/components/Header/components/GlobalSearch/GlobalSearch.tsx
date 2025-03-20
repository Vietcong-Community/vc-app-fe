import React, { useEffect, useState } from 'react';

import { faCircleXmark } from '@fortawesome/free-solid-svg-icons/faCircleXmark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AutoComplete, Form } from 'antd';

import { useTeamsList } from '../../../../api/hooks/teams/api';
import { useUserList } from '../../../../api/hooks/users/api';
import { useRouter } from '../../../../hooks/RouterHook';
import { Routes } from '../../../../routes/enums';
import { AnimatedWidthContainer } from '../../../Animations/AnimatedWidthContainer/AnimatedHeightContainer';
import { SelectField } from '../../../Fields/SelectField/SelectField';
import { FormComponent } from '../../../Form/FormComponent';

import { fields, GLOBAL_SELECT_OPTIONS, GlobalSelectType, IFormData } from './GlobalSearch.fields';

import * as S from './GlobalSearch.style';

interface IProps {
  hideOverflow?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onExitComplete?: () => void;
  showCloseIcon?: boolean;
}

export const GlobalSearch: React.FC<IProps> = (props: IProps) => {
  const { hideOverflow = false, isOpen, onClose, onExitComplete, showCloseIcon = true } = props;
  const { navigate } = useRouter();
  const [userQuery, setUserQuery] = useState<{ nickname?: string }>({});
  const [teamQuery, setTeamQuery] = useState<{ name?: string }>({});
  const [form] = Form.useForm<IFormData>();
  const formValueType = Form.useWatch('type', form);
  const formValueName = Form.useWatch('name', form);

  const users = useUserList(userQuery, true, !!userQuery?.nickname && userQuery.nickname.length >= 3);
  const teams = useTeamsList(teamQuery, true, !!teamQuery?.name && teamQuery.name.length >= 3);

  useEffect(() => {
    if (formValueName?.length >= 3) {
      if (formValueType === GlobalSelectType.PLAYERS) {
        setUserQuery({ nickname: formValueName });
      } else {
        setTeamQuery({ name: formValueName });
      }
    }
  }, [formValueName?.length]);

  const getOptions = () => {
    if (formValueName?.length < 3) {
      return [];
    }

    if (formValueType === GlobalSelectType.PLAYERS) {
      return users.data?.users?.map((item) => ({ label: item.nickname, value: item.id })) ?? [];
    } else {
      return teams.data?.teams?.map((item) => ({ label: item.name, value: item.id })) ?? [];
    }
  };

  const handleOnClick = (value: string) => {
    if (formValueType === GlobalSelectType.PLAYERS) {
      navigate(Routes.USER_PROFILE.replace(':id', value));
    } else {
      navigate(Routes.TEAM_DETAIL.replace(':id', value));
    }
    onClose?.();
    form.resetFields();
  };

  return (
    <AnimatedWidthContainer
      customStyle={hideOverflow ? { overflow: 'initial' } : undefined}
      isOpen={isOpen}
      onExitComplete={onExitComplete}
    >
      <FormComponent form={form} initialValues={{ type: GlobalSelectType.PLAYERS, name: '' }}>
        <S.Container>
          <SelectField
            {...fields.type}
            allowClear={false}
            options={GLOBAL_SELECT_OPTIONS}
            onCustomChange={() => form.setFieldValue('name', '')}
            customStyle={{ marginBottom: 0 }}
          />
          <Form.Item name={fields.name.name} style={{ marginBottom: 0, width: '100%' }}>
            <AutoComplete allowClear options={getOptions()} onSelect={handleOnClick} />
          </Form.Item>
          {showCloseIcon && (
            <FontAwesomeIcon icon={faCircleXmark} onClick={onClose} style={{ cursor: 'pointer', fontSize: 24 }} />
          )}
        </S.Container>
      </FormComponent>
    </AnimatedWidthContainer>
  );
};
