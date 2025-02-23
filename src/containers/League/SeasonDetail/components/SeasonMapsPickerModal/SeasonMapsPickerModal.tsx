import React from 'react';

import { Form, Modal, Spin } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { IMap } from '../../../../../api/hooks/interfaces';
import { useSetSeasonMaps } from '../../../../../api/hooks/league/api';
import { useAllMaps } from '../../../../../api/hooks/map/api';
import { SelectField } from '../../../../../components/Fields/SelectField/SelectField';
import { FormComponent } from '../../../../../components/Form/FormComponent';
import { Gap } from '../../../../../components/Gap/Gap';
import { useNotifications } from '../../../../../hooks/NotificationsHook';
import { NotificationType } from '../../../../../providers/NotificationsProvider/enums';

import { fields, IFormData } from './SeasonMapsPickerModal.fields';
import { messages } from './messages';

interface IProps {
  closeModal: () => void;
  isOpen: boolean;
  seasonMaps: IMap[];
  seasonId: string;
}

export const SeasonMapsPickerModal: React.FC<IProps> = (props: IProps) => {
  const { closeModal, isOpen, seasonMaps, seasonId } = props;
  const { showNotification } = useNotifications();
  const { formatMessage } = useIntl();
  const [form] = Form.useForm<IFormData>();

  const allMaps = useAllMaps(isOpen);
  const setSeasonMaps = useSetSeasonMaps(seasonId);

  const onSubmit = async (values: IFormData) => {
    try {
      await setSeasonMaps.mutateAsync({ mapsIds: values.maps });
      showNotification(messages.saveSuccess);
      closeModal();
    } catch {
      showNotification(messages.saveFailed, undefined, NotificationType.ERROR);
    }
  };
  const mapsOptions = allMaps.data?.items?.map((item) => ({ id: item.id, value: item.id, label: item.name })) ?? [];

  return (
    <Modal
      cancelButtonProps={{ style: { display: 'none' } }}
      title={<FormattedMessage {...messages.title} />}
      onCancel={closeModal}
      okButtonProps={{ htmlType: 'submit', form: 'maps' }}
      open={isOpen}
      confirmLoading={setSeasonMaps.isPending}
      width={350}
    >
      {allMaps.isLoading && (
        <>
          <Gap defaultHeight={16} />
          <Spin />
        </>
      )}
      {!allMaps.isLoading && !!allMaps.data && (
        <FormComponent
          id="maps"
          form={form}
          initialValues={{ maps: seasonMaps.map((item) => item.id) ?? [] }}
          onSubmit={onSubmit}
        >
          <SelectField
            {...fields.maps}
            label={<FormattedMessage {...messages.maps} />}
            placeholder={formatMessage(messages.maps)}
            options={mapsOptions}
            mode="multiple"
          />
        </FormComponent>
      )}
    </Modal>
  );
};
