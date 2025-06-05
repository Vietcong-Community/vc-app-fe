import React, { useMemo, useState } from 'react';

import { Form, Modal } from 'antd';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';

import { IMap } from '../../../api/hooks/interfaces';
import { useCreateRankedMatch, usePickMapForRankedMatch } from '../../../api/hooks/ranked/api';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { useRouter } from '../../../hooks/RouterHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../routes/enums';
import { MAXIMAL_PLAYERS_SELECT_OPTIONS } from '../../../utils/mappingLabelUtils';
import { DatePickerField, DEFAULT_SYSTEM_DATE_TIME_FORMAT } from '../../Fields/DatePickerField/DatePickerField';
import { SelectField } from '../../Fields/SelectField/SelectField';
import { FormComponent } from '../../Form/FormComponent';
import { Gap } from '../../Gap/Gap';

import { fields, IFormData } from './CreateRankedMatchModal.fields';
import { messages } from './messages';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  maps: IMap[];
  seasonId: string;
  userIsAdmin: boolean;
}

export const CreateRankedMatchModal: React.FC<IProps> = (props: IProps) => {
  const { isOpen, onClose, maps, seasonId, userIsAdmin } = props;
  const { navigate } = useRouter();
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [form] = Form.useForm();
  const firstPickedMapId = Form.useWatch('firstMapId', form);
  const secondPickedMapId = Form.useWatch('secondMapId', form);

  const createRankedMatch = useCreateRankedMatch(seasonId);
  const voteForMap = usePickMapForRankedMatch();

  const onSubmit = async (values: IFormData) => {
    try {
      setIsSubmitting(true);
      const endDate = dayjs(values.startDate).add(1, 'hour').format(DEFAULT_SYSTEM_DATE_TIME_FORMAT);
      const result = await createRankedMatch.mutateAsync({
        maximalPlayers: values.maximalPlayers,
        startDate: values.startDate,
        endDate,
      });
      const matchId = result.id;
      await voteForMap.mutateAsync({ mapId: values.firstMapId, matchId });
      await voteForMap.mutateAsync({ mapId: values.secondMapId, matchId });
      showNotification(messages.createSuccess, messages.createSuccessDescription);
      onClose();
      form.resetFields();
      navigate(Routes.RANKED_MATCH_DETAIL.replace(':matchId', matchId));
    } catch {
      showNotification(messages.createFailed, undefined, NotificationType.ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  const firstMapsOptions = useMemo(() => {
    return (
      maps
        ?.filter((item) => item.id !== secondPickedMapId)
        ?.map((item) => ({ id: item.id, value: item.id, label: item.name })) ?? []
    );
  }, [secondPickedMapId, isOpen]);

  const secondMapsOptions = useMemo(() => {
    return (
      maps
        ?.filter((item) => item.id !== firstPickedMapId)
        ?.map((item) => ({ id: item.id, value: item.id, label: item.name })) ?? []
    );
  }, [firstPickedMapId, isOpen]);

  return (
    <Modal
      title={<FormattedMessage {...messages.title} />}
      okButtonProps={{ htmlType: 'submit', form: 'create-match' }}
      onCancel={onClose}
      confirmLoading={isSubmitting}
      open={isOpen}
    >
      <FormComponent form={form} id="create-match" onSubmit={onSubmit}>
        <FormattedMessage {...messages.description} />
        <Gap defaultHeight={16} />
        <SelectField
          {...fields.maximalPlayers}
          label={<FormattedMessage {...messages.playersCount} />}
          placeholder={formatMessage(messages.playersCount)}
          options={MAXIMAL_PLAYERS_SELECT_OPTIONS}
        />
        <SelectField
          {...fields.firstMapId}
          label={<FormattedMessage {...messages.firstPreferredMap} />}
          placeholder={formatMessage(messages.firstPreferredMap)}
          options={firstMapsOptions}
        />
        <SelectField
          {...fields.secondMapId}
          label={<FormattedMessage {...messages.secondPreferredMap} />}
          placeholder={formatMessage(messages.secondPreferredMap)}
          options={secondMapsOptions}
        />
        <DatePickerField
          {...fields.startDate}
          label={<FormattedMessage {...messages.startDate} />}
          placeholder={formatMessage(messages.startDate)}
          showTime
          minimalDate={dayjs()}
          maximalDate={!userIsAdmin ? dayjs() : undefined}
        />
      </FormComponent>
    </Modal>
  );
};
