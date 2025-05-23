import React, { useMemo, useState } from 'react';

import { Form, Modal } from 'antd';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';

import { IMap } from '../../../api/hooks/interfaces';
import { useCreateRankedMatch, usePickMapForRankedMatch } from '../../../api/hooks/ranked/api';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { DatePickerField, DEFAULT_SYSTEM_DATE_TIME_FORMAT } from '../../Fields/DatePickerField/DatePickerField';
import { SelectField } from '../../Fields/SelectField/SelectField';
import { FormComponent } from '../../Form/FormComponent';

import { fields, IFormData } from './CreateRankedMatchModal.fields';
import { messages } from './messages';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  maps: IMap[];
  seasonId: string;
}

export const CreateRankedMatchModal: React.FC<IProps> = (props: IProps) => {
  const { isOpen, onClose, maps, seasonId } = props;
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
      const result = await createRankedMatch.mutateAsync({ startDate: values.startDate, endDate });
      const matchId = result.id;
      await voteForMap.mutateAsync({ mapId: values.firstMapId, matchId });
      await voteForMap.mutateAsync({ mapId: values.secondMapId, matchId });
      showNotification(messages.createSuccess, messages.createSuccessDescription);
      onClose();
      form.resetFields();
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
        />
      </FormComponent>
    </Modal>
  );
};
