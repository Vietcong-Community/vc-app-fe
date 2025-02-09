import React from 'react';

import { Form, Modal } from 'antd';
import { sortBy } from 'lodash';
import { FormattedMessage, useIntl } from 'react-intl';

import { IMap } from '../../../../../api/hooks/interfaces';
import { ILadderItem } from '../../../../../api/hooks/league/interfaces';
import { DatePickerField } from '../../../../../components/Fields/DatePickerField/DatePickerField';
import { SelectField } from '../../../../../components/Fields/SelectField/SelectField';
import { FormComponent } from '../../../../../components/Form/FormComponent';
import { MATCH_STATUS_SELECT_OPTIONS } from '../../../../../utils/mappingLabelUtils';

import { fields, IFormData } from './MatchFilterModal.fields';
import { messages } from './messages';

interface IProps {
  closeModal: () => void;
  initialValues?: Partial<IFormData>;
  isOpen: boolean;
  isSubmitting?: boolean;
  onSubmit: (values: IFormData) => void;
  maps: IMap[];
  seasonLadder: ILadderItem[];
}

export const MatchFilterModal: React.FC<IProps> = (props: IProps) => {
  const { closeModal, initialValues, isOpen, isSubmitting = false, maps, onSubmit, seasonLadder } = props;
  const { formatMessage } = useIntl();
  const [form] = Form.useForm<IFormData>();

  const teamOptions = sortBy(
    seasonLadder.map((item) => ({ id: item.team.id, value: item.team.id, label: item.team.name })) ?? [],
    'label',
  );
  const mapsOptions = maps.map((item) => ({ id: item.id, value: item.id, label: item.name })) ?? [];

  return (
    <Modal
      title={<FormattedMessage {...messages.title} />}
      onCancel={closeModal}
      onOk={closeModal}
      open={isOpen}
      okButtonProps={{ htmlType: 'submit', form: 'match-filter' }}
      confirmLoading={isSubmitting}
    >
      <FormComponent id="match-filter" form={form} initialValues={initialValues} onSubmit={onSubmit}>
        <SelectField
          {...fields.mapId}
          label={<FormattedMessage {...messages.map} />}
          placeholder={formatMessage(messages.map)}
          options={mapsOptions}
        />
        <SelectField
          {...fields.teamId}
          label={<FormattedMessage {...messages.team} />}
          placeholder={formatMessage(messages.team)}
          options={teamOptions}
        />
        <SelectField
          {...fields.status}
          label={<FormattedMessage {...messages.status} />}
          placeholder={formatMessage(messages.status)}
          options={MATCH_STATUS_SELECT_OPTIONS}
          mode="multiple"
        />
        <DatePickerField
          {...fields.startDateFrom}
          label={<FormattedMessage {...messages.startDateFrom} />}
          placeholder={formatMessage(messages.startDateFrom)}
          showTime
        />
        <DatePickerField
          {...fields.startDateTo}
          label={<FormattedMessage {...messages.startDateTo} />}
          placeholder={formatMessage(messages.startDateTo)}
          showTime
        />
      </FormComponent>
    </Modal>
  );
};
